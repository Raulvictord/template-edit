// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const express = require("express");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const { dataExempleXMLCPF,dataExempleXMLCNPJ,dataExempleBudget } = require("./const");

const app = express();

// eslint-disable-next-line no-undef
const baseDir = `${__dirname}/dist`;

app.get("/budget", async (req, res) => {
    const data = dataExempleBudget; // Use the example data defined in const.js
    console.log(data);
    const htmlString = await fs.readFileSync(
    path.join(__dirname, "./templates/budgets/", "budget-template.ejs"),
    "utf-8"
    ).toString();
    const renderedFile = await ejs.render(htmlString, { data: data });
    const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new" 
    });
    const page = await browser.newPage();
    await page.emulateMediaType("screen");
    await page.setContent(renderedFile, { waitUntil: "domcontentloaded" });
    const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    });
    const base64String = Buffer.from(pdfBuffer).toString("base64");
    await browser.close();
    res
    .type("application/pdf")
    .header(
        "Content-Disposition",
        `attachment; filename="orcamento.pdf"`
    )
    .status(200)
    .send(Buffer.from(base64String, "base64"));
});

app.get("/analysis-cpf", async (req, res) => {
    const data = dataExempleXMLCPF;
    console.log(data);
    const htmlString = await fs.readFileSync(
    path.join(__dirname, "./templates/analysis/", "analysis-template.ejs"),
    "utf-8"
    ).toString();
    const renderedFile = await ejs.render(htmlString, { data: data });
    const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new" 
    });
    const page = await browser.newPage();
    await page.emulateMediaType("screen");
    await page.setContent(renderedFile, { waitUntil: "domcontentloaded" });
    const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    });
    const base64String = Buffer.from(pdfBuffer).toString("base64");
    await browser.close();
    res
    .type("application/pdf")
    .header(
        "Content-Disposition",
        `attachment; filename="analise-cpf.pdf"`
    )
    .status(200)
    .send(Buffer.from(base64String, "base64"));
});
    
app.get("/analysis-cnpj", async (req, res) => {
    const data = dataExempleXMLCNPJ;
    console.log(data);
    const htmlString = await fs.readFileSync(
    path.join(__dirname, "./templates/analysis/", "analysis-template.ejs"),
    "utf-8"
    ).toString();
    const renderedFile = await ejs.render(htmlString, { data: data });
    const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new" 
    });
    const page = await browser.newPage();
    await page.emulateMediaType("screen");
    await page.setContent(renderedFile, { waitUntil: "domcontentloaded" });
    const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    });
    const base64String = Buffer.from(pdfBuffer).toString("base64");
    await browser.close();
    res
    .type("application/pdf")
    .header(
        "Content-Disposition",
        `attachment; filename="analise-cnpj.pdf"`
    )
    .status(200)
    .send(Buffer.from(base64String, "base64"));
});

const port = 3000;

app.listen(port, () =>
  console.log(`server is online on http://localhost:${port}`)
);
