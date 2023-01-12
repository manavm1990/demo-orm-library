import Book from "../book/model.js";
import Card from "../card/model.js";
import sequelize from "../conn.js";
import Reader from "../reader/model.js";
import bookSeed from "./seeds/book.json" assert { type: "json" };
import readerSeed from "./seeds/reader.json" assert { type: "json" };

async function seed() {
  await Reader.bulkCreate(readerSeed, {
    individualHooks: true,
  });

  const readers = await Reader.findAll();

  Promise.all(
    readers.map(async (reader) => {
      await Card.create({ readerId: reader.id });
    })
  );

  Promise.all(
    bookSeed.map(async (book) => {
      await Book.create({
        ...book,
        readerId: readers[Math.floor(Math.random() * readers.length)].id,
      });
    })
  );
}

export default async function init() {
  Reader.hasOne(Card, {
    // Delete child 🧒🏾 records when parent is deleted
    onDelete: "CASCADE",
  });

  Card.belongsTo(Reader);

  Reader.hasMany(Book);

  Book.belongsTo(Reader);

  await sequelize.sync().catch((err) => {
    console.error(`Error syncing database: ${err}`);
    process.exit(1);
  });

  console.info("All models were synchronized successfully.");

  console.info("Checking if database needs to be seeded...");

  const readers = await Reader.findAll();
  if (!readers.length) {
    console.info("Database needs to be seeded.");
    await seed();
    console.info("Database has been seeded.");
  }

  console.info("Database is ready.");
}
