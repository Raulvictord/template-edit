// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const express = require('express');
const puppeteer = require('puppeteer');
const render = require('ejs');
const fs = require('fs')
const path = require('path')


const app = express()

// eslint-disable-next-line no-undef
const baseDir = `${__dirname}/dist`

// app.use(express.static(`${baseDir}`))

app.get('*',async (req,res) => {
    const data = {
        date: `Rio de Janeiro`,
        type: "COTAÇÃO DE SEGURO FIANÇA",
        client: {
          name: "pretendente.nome",
          document: "pretendente.cpf",
          city: "card.imovelPretendido.cidade",
        },
        income: {
          reportedIncome: "pretendente.rendaBruta",
          expense: "teste",
          percentage: `10 %`,
        },
        insurers: {
          portoSeguro: {
            value: 10 ? `R$ ${10 ?? ""}` : "NEGADO",
            percentage: 10
              ? `10 %`
              : "",
          },
          portoSeguroEssencial: {
            value: 10 ? `R$ ${10 ?? ""}` : "NEGADO",
            percentage: 10
              ? `10 %`
              : "",
          },
          too: {
            value: 10 ? `R$ ${10 ?? ""}` : "NEGADO",
            percentage: 10
              ? `10 %`
              : "0 %",
          },
          pottencial: {
            value: " - ",
            percentage: " - ",
          },
          tokio: {
            value: " - ",
            percentage: " - ",
          },
          total: {
            value: "0",
            percentage: "0",
          },
        },
        itemsValues: {
          rent: {
            contractValue: 10,
            deposit: 10,
            capitalization: 10,
            bailInsurance: 10,
            essentialInsurance: 10,
          },
          condominium: {
            contractValue: 10 ? `${10}` : "",
            deposit: "",
            capitalization: "",
            bailInsurance: 10
              ? (10 ?? 0) * 30
              : "",
            10: "",
          },
          iptu: {
            contractValue: 10 ? `${10 ?? 0}` : "",
            deposit: "",
            capitalization: "",
            bailInsurance: 10 ? (10 ?? 0) * 30 : "",
            essentialInsurance: "",
          },
          contractualFines: {
            contractValue: "",
            deposit: "",
            capitalization: "",
            bailInsurance: 10 * 3,
            essentialInsurance: "",
          },
          damageProperty: {
            contractValue: "",
            deposit: "",
            capitalization: "",
            bailInsurance: 10 * 6,
            essentialInsurance: "",
          },
          externalPainting: {
            contractValue: "",
            deposit: "",
            capitalization: "",
            bailInsurance: "",
            essentialInsurance: "",
          },
          internalPainting: {
            contractValue: "",
            deposit: "",
            capitalization: "",
            bailInsurance: 10,
            essentialInsurance: "",
          },
          total: {
            contractValue: 10,
            deposit: "",
            capitalization: "",
            bailInsurance: "",
            essentialInsurance: "",
          },
          coverageOwner: {
            contractValue: "",
            deposit: 10,
            capitalization: 10,
            bailInsurance: 10,
          },
          costTenant: {
            contractValue: "",
            deposit: 10 * 3,
            capitalization: 10,
            bailInsurance: 10
              ? `R$ ${10 ?? ""}`
              : "NEGADO",
            /* bailInsurance: parseFloat(valorParcelaPorto??0) > parseFloat(valorParcelaToo??0) ? `${valorParcelaPorto??''}` : `${valorParcelaToo??''}`, */
            essentialInsurance: 10
              ? `R$ ${10 ?? ""}`
              : "NEGADO",
          },
        },
        company: {
          phone: "21 98244-4801",
          email: "contato@forcecure.com.br",
          site: "https://www.forcecure.com.br",
        },
      };
      
    const htmlString = await fs.readFileSync(
        path.join(__dirname, "./templates/", "budget-template.ejs"),
      "utf-8"
    ).toString();
    const renderedFile = await render.render(htmlString, { data: data });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(renderedFile, { waitUntil: "domcontentloaded" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    const base64String = Buffer.from(pdfBuffer).toString("base64");

    res.type('application/pdf')
    .header('Content-Disposition', `attachment; filename="fl-proposta-${req.params.cardId}.pdf"`)
    .status(200)
    .send(Buffer.from(base64String, 'base64'));
})

const port = 3000

app.listen(port, () => console.log(`front-end server is online on http://localhost:${port}`))