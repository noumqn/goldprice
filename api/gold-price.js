
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  try {
    const response = await axios.get("https://www.goodreturns.in/gold-rates/");
    const $ = cheerio.load(response.data);

    const selector = ".gold_silver_table tbody tr td:nth-child(2)";
    const priceText = $(selector).first().text().replace(/[₹,]/g, "").trim();

    const goldPricePerGram = parseFloat(priceText) / 10;

    res.status(200).json({ price_per_gram: goldPricePerGram });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gold price", details: error.message });
  }
};
