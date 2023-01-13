import Book from "../book/model.js";
import Card from "../card/model.js";
import sequelize from "../conn.js";
import Reader from "../reader/model.js";
import bookSeed from "./seeds/book.json" assert { type: "json" };
import readerSeed from "./seeds/reader.json" assert { type: "json" };

async function seed() {
  // Create readers
  await Reader.bulkCreate(readerSeed, {
    // Be sure to sanitize the data before seeding
    individualHooks: true,
  });

  // Get all readers that were just seeded
  const readers = await Reader.findAll();

  // Use Promise.all when you need to wait for multiple promises to resolve
  Promise.all(
    // Join each seeded reader with a card
    readers.map(async (reader) => {
      await Card.create({ readerId: reader.id });
    })
  );

  Promise.all(
    bookSeed.map(async (book) => {
      await Book.create({
        // Create a book based on the seed data
        ...book,

        // Join the book to a random reader
        readerId: readers[Math.floor(Math.random() * readers.length)].id,
      });
    })
  );
}

export default async function init() {
  // By default, Sequelize will use onDelete: "NOT NULL"
  Reader.hasOne(Card, {
    // Delete child 🧒🏾 records when parent is deleted
    onDelete: "CASCADE",
  });
  Card.belongsTo(Reader);
  Reader.hasMany(Book);
  Book.belongsTo(Reader);

  // Sync all models that are defined
  await sequelize.sync().catch((err) => {
    console.error(`Error syncing database: ${err}`);
    process.exit(1);
  });

  console.info("All models were synchronized successfully.");

  console.info("Checking if database needs to be seeded...");

  // Only seed if there are no readers
  const readers = await Reader.findAll();
  if (!readers.length) {
    console.info("Database needs to be seeded.");
    await seed();
    console.info("Database has been seeded.");
  }

  console.info("Database is ready.");
}
