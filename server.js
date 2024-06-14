// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const express = require("express");
const puppeteer = require("puppeteer");
const render = require("ejs");
const fs = require("fs");
const path = require("path");

const app = express();

// eslint-disable-next-line no-undef
const baseDir = `${__dirname}/dist`;

// app.use(express.static(`${baseDir}`))

app.get("*", async (req, res) => {
  const data = {
    date: `Rio de Janeiro`,
    type: "COTAÇÃO DE SEGURO FIANÇA",
    client: {
      name: "Fulano de Tal da Silva",
      document: "123.456.789-10",
      address: {
        place: "Rua Francisquinho da silva silva silva santos",
        number: "3003",
        complement: "Apto. 2020, Bl 6",
        state: "SP",
        CEP: "12345000",
      },
      email: "fulanotal@focecure.com.br",
      phone: "(18) 94002-8922",
    },
    consulta: {
      cabecalho: {
        consulta: "341",
        data_consulta: "28/05/2024 18:13:39",
        ip_solicitante: "167.250.172.159",
        documento_consultado: "10920107850",
        status: "0",
        mensagem: "sucesso",
        mensagem_status: "sucesso",
        consultas_mensais_restantes: "43"
      },
      resposta: {
        identificacao: {
          pessoa: "FISICA",
          documento: "10920107850",
          nome: "ALEXANDRE GUEDES NOGUEIRA",
          nome_mae: "GENI GUEDES NOGUEIRA",
          data_nascimento: "02/03/1978",
          rg: "",
          emissor_rg: "",
          uf_rg: "",
          data_emissao_rg: "",
          sexo: "MASCULINO",
          nacionalidade: "BRASILEIRO",
          estado_civil: "NAO INFORMADO",
          numero_dependentes: "",
          escolaridade: "POS GRADUACAO COMPLETA",
          situacao_receita: "REGULAR",
          data_atualizacao: "18/06/2023",
          regiao_cpf: "SP-SAO PAULO",
          obito: "",
          titulo_eleitor: "237781160167"
        },
        localizacao: {
          tipo: "AV",
          endereco: "PRES JOAO GOULART",
          numero: "1",
          complemento: "AP 132 BL DAKOTA",
          bairro: "UMUARAMA",
          cidade: "OSASCO",
          uf: "SP",
          cep: "6036048",
          ddd1: "21",
          telefone1: "982444801",
          ddd2: "11",
          telefone2: "43769912",
          ddd3: "55",
          telefone3: "32215226"
        },
        acoes: {},
        alertas: {},
        debitos: {},
        protestos: {},
        consultas_por_segmento: {
          registro: [
            {
              pessoa: "FISICA",
              documento: "10920107850",
              ocorrencia: "OU-OUTROS",
              data: "28/05/2024",
              moeda: "",
              valor: "",
              informante: "SP-SPO/INFORMBANK - BANCO DE INFORMA",
              atividade_ramo: "",
              descricao_ramo: "",
              atividade_segmento: "",
              descricao_segmento: "",
              atividade_grupo: "",
              descricao_grupo: ""
            },
            {
              pessoa: "FISICA",
              documento: "10920107850",
              ocorrencia: "OU-OUTROS",
              data: "15/05/2024",
              moeda: "",
              valor: "",
              informante: "SP-SPO/INFORMBANK - BANCO DE INFORMA",
              atividade_ramo: "",
              descricao_ramo: "",
              atividade_segmento: "",
              descricao_segmento: "",
              atividade_grupo: "",
              descricao_grupo: ""
            },
            {
              pessoa: "FISICA",
              documento: "10920107850",
              ocorrencia: "OU-OUTROS",
              data: "06/03/2024",
              moeda: "",
              valor: "",
              informante: "SP-SPO/INFORMBANK - BANCO DE INFORMA",
              atividade_ramo: "",
              descricao_ramo: "",
              atividade_segmento: "",
              descricao_segmento: "",
              atividade_grupo: "",
              descricao_grupo: ""
            }
          ]
        },
        telefones: {},
        telefones_vinculados: {
          registro: {
            ddd: "11",
            telefone: "43769912",
            endereco: "AV PRES JOAO GOULART 1 BL DAKOTA APT 132",
            bairro: "UMUARAMA",
            cep: "6036048",
            cidade: "OSASCO",
            uf: "SP"
          }
        },
        confirmacao_cep: {},
        ccf: {},
        cheque_motivo_21: {},
        devolucao_informada_pelo_usuario: {},
        cheque_talao_sustado: {},
        resumo_devolucoes_informadas_pelo_ccf: {},
        resumo_consultas_anteriores_cheque: {},
        historico_cheque_informado: {},
        consultas_anteriores_cheque: {},
        resumo_devolucoes_informadas_pelo_usuario: {},
        grafias: {
          registro: [
            {
              nome: "ALEXANDRE GUEDES NOGUEIRA",
              documento: "10920107850",
              data_nascimento: "02/03/1978",
              rg: "",
              tipo: "AV",
              endereco: "ESTADOS UNIDOS",
              numero: "1",
              complemento: "AP 132",
              bairro: "JD D'ABRIL",
              cidade: "OSASCO",
              uf: "SP",
              cep: "6033190",
              ddd1: "55",
              telefone1: "32215226",
              ddd2: "",
              telefone2: "",
              ddd3: "",
              telefone3: ""
            },
            {
              nome: "ALEXANDRE GUEDES NOGUEIRA",
              documento: "10920107850",
              data_nascimento: "02/03/1978",
              rg: "",
              tipo: "AV",
              endereco: "PRES JOAO GOULART",
              numero: "1",
              complemento: "AP 68 ED DAKOT",
              bairro: "UMUARAMA",
              cidade: "OSASCO",
              uf: "SP",
              cep: "6036048",
              ddd1: "11",
              telefone1: "976082493",
              ddd2: "",
              telefone2: "",
              ddd3: "",
              telefone3: ""
            },
            {
              nome: "ALEXANDRE GUEDES NOGUEIRA",
              documento: "10920107850",
              data_nascimento: "02/03/1978",
              rg: "",
              tipo: "AV",
              endereco: "PRES JOAO GOULART",
              numero: "1",
              complemento: "AP 132 ED DAKOT",
              bairro: "UMUARAMA",
              cidade: "OSASCO",
              uf: "SP",
              cep: "6036048",
              ddd1: "11",
              telefone1: "976082493",
              ddd2: "",
              telefone2: "",
              ddd3: "",
              telefone3: ""
            },
            {
              nome: "ALEXANDRE GUEDES NOGUEIRA",
              documento: "10920107850",
              data_nascimento: "02/03/1978",
              rg: "",
              tipo: "AV",
              endereco: "ESTADOS UNIDOS",
              numero: "1",
              complemento: "AP 132 ED DAKOT",
              bairro: "JD D'ABRIL",
              cidade: "OSASCO",
              uf: "SP",
              cep: "6033190",
              ddd1: "11",
              telefone1: "976082493",
              ddd2: "",
              telefone2: "",
              ddd3: "",
              telefone3: ""
            },
            {
              nome: "ALEXANDRE GUEDES NOGUEIRA",
              documento: "10920107850",
              data_nascimento: "02/03/1978",
              rg: "",
              tipo: "AV",
              endereco: "NS DAS DORES",
              numero: "305",
              complemento: "AP 1004 BLB",
              bairro: "NOSSA SENHORA DAS DORES",
              cidade: "SANTA MARIA",
              uf: "RS",
              cep: "97050531",
              ddd1: "55",
              telefone1: "32215226",
              ddd2: "",
              telefone2: "",
              ddd3: "",
              telefone3: ""
            },
            {
              nome: "ALEXANDRE GUEDES NOGUEIRA",
              documento: "10920107850",
              data_nascimento: "02/03/1978",
              rg: "",
              tipo: "AV",
              endereco: "ESTADOS UNIDOS",
              numero: "1",
              complemento: "AP 132 ED D QD",
              bairro: "JD D'ABRIL",
              cidade: "OSASCO",
              uf: "SP",
              cep: "6033190",
              ddd1: "11",
              telefone1: "976082493",
              ddd2: "",
              telefone2: "",
              ddd3: "",
              telefone3: ""
            },
            {
              nome: "ALEXANDRE GUEDES NOGUEIRA",
              documento: "10920107850",
              data_nascimento: "02/03/1978",
              rg: "",
              tipo: "AV",
              endereco: "NS DAS DORES",
              numero: "305",
              complemento: "AP 1004 BL B",
              bairro: "NOSSA SENHORA DAS DORES",
              cidade: "SANTA MARIA",
              uf: "RS",
              cep: "97050531",
              ddd1: "",
              telefone1: "",
              ddd2: "",
              telefone2: "",
              ddd3: "",
              telefone3: ""
            },
            {
              nome: "ALEXANDRE GUEDES NOGUEIRA",
              documento: "10920107850",
              data_nascimento: "02/03/1978",
              rg: "",
              tipo: "R",
              endereco: "MTO FORTUNATO NETO",
              numero: "161",
              complemento: "",
              bairro: "PARQUE ALVORADA",
              cidade: "PRESIDENTE PRUDENTE",
              uf: "SP",
              cep: "19042080",
              ddd1: "",
              telefone1: "",
              ddd2: "",
              telefone2: "",
              ddd3: "",
              telefone3: ""
            },
            {
              nome: "ALEXANDRE GUEDES NOGUEIRA",
              documento: "10920107850",
              data_nascimento: "02/03/1978",
              rg: "",
              tipo: "AV",
              endereco: "BRASIL",
              numero: "2476",
              complemento: "",
              bairro: "VL INDUSTRIAL",
              cidade: "PRESIDENTE PRUDENTE",
              uf: "SP",
              cep: "19013002",
              ddd1: "",
              telefone1: "",
              ddd2: "",
              telefone2: "",
              ddd3: "",
              telefone3: ""
            }
          ]
        },
        participacoes: {
          registro: [
            {
              razao_social: "SEGUROTOTAL CORRETORA DE SEGUROS LTDA",
              pessoa: "CNPJ",
              documento: "52153156000106",
              moeda: "R$",
              valor: "100,00",
              observacao: "NAO CONSTA ALERTA PARA O CNPJ",
              percentual: "10000",
              data_entrada: "12/09/2023",
              funcao_socio: "SOCIO ADMINISTRADOR",
              pessoa_socio: "CPF",
              documento_socio: "10920107850",
              tipo_socio: "SOCIO"
            },
            {
              razao_social: "FORCECURE CORRETORA DE SEGUROS EIRELI",
              pessoa: "CNPJ",
              documento: "27162120000141",
              moeda: "R$",
              valor: "200,00",
              observacao: "NAO CONSTA ALERTA PARA O CNPJ",
              percentual: "10000",
              data_entrada: "02/09/2019",
              funcao_socio: "TITULAR PESSOA FISICA",
              pessoa_socio: "CPF",
              documento_socio: "10920107850",
              tipo_socio: "SOCIO"
            }
          ]
        },
        falencias: {},
        score: {
          registro: [
            {
              pessoa: "FISICA",
              score: "0504",
              execucao: "NAO",
              descricao_score: "63-NOVO RISCO 6 MESES",
              classificacao_numerico: "7",
              classificacao_alfabetico: "C",
              provavel: "01600",
              texto: "DE CADA 100 PESSOAS CLASSIFICADAS NESTA CLASSE DE SCORE, E PROVAVEL QUE 16 APRESENTEM DEBITOS NO MERCADO NOS PROXIMOS 6 MESES."
            },
            {
              pessoa: "FISICA",
              score: "0006",
              execucao: "NAO",
              descricao_score: "41-RENDA PRESUM FAIXA",
              classificacao_numerico: "6",
              classificacao_alfabetico: "",
              provavel: "",
              texto: "DE R$ 3.001 ATE R$ 4.000"
            },
            {
              pessoa: "FISICA",
              score: "0569",
              execucao: "NAO",
              descricao_score: "39-PARCELA SEGURA PF",
              classificacao_numerico: "",
              classificacao_alfabetico: "",
              provavel: "",
              texto: "VALOR DE PARCELA MENSAL SUGERIDA (EM REAIS)"
            }
          ]
        },
        decisao: {
          pessoa: "FISICA",
          documento: "10920107850",
          score: "0003",
          aprovacao: "SIM",
          texto: "NEGOCIACAO RECOMENDADA"
        }
      }
    },
    immobile: {
      locationType: "Residencial",
    },
    itemsValues: {
      rent: {
        contractValue: 1200,
        deposit: 10,
        capitalization: 10,
        bailInsurance: 10,
        essentialInsurance: 10,
      },
      condominium: {
        contractValue: 1200,
        deposit: "",
        capitalization: "",
        bailInsurance: 10,
        essentialInsurance: "",
      },
      iptu: {
        contractValue: 1200,
        deposit: "",
        capitalization: "",
        bailInsurance: 10,
        essentialInsurance: "",
      },
      contractualFines: {
        contractValue: "",
        deposit: "",
        capitalization: "",
        bailInsurance: 10,
        essentialInsurance: "",
      },
      damageProperty: {
        contractValue: "",
        deposit: "",
        capitalization: "",
        bailInsurance: 10,
        essentialInsurance: "",
      },
      externalPainting: {
        contractValue: "",
        deposit: "",
        capitalization: "",
        bailInsurance: 10,
        essentialInsurance: 10,
      },
      internalPainting: {
        contractValue: "",
        deposit: "",
        capitalization: "",
        bailInsurance: 10,
        essentialInsurance: 10,
      },
      total: {
        contractValue: 12000,
        deposit: "",
        capitalization: "",
        bailInsurance: 10,
        essentialInsurance: 10,
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
        bailInsurance: 10 ? `R$ ${10 ?? ""}` : "NEGADO",
        essentialInsurance: 10 ? `R$ ${10 ?? ""}` : "NEGADO",
      },
    },
    company: {
      phone: "21 98244-4801",
      email: "contato@forcecure.com.br",
      site: "https://www.forcecure.com.br",
    },
  };

  const htmlString = await fs
    .readFileSync(
      path.join(__dirname, "./templates/", "budget-template.ejs"),
      "utf-8"
    )
    .toString();
    
  const options = { async: true };

  const renderedFile = await render.render(htmlString, { data: data }, options);
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulateMediaType("screen");
  await page.setContent(renderedFile, { waitUntil: "domcontentloaded" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "6mm",
      bottom: "10mm",
      left: "2mm",
      right: "2mm"
    }
  });

  const base64String = Buffer.from(pdfBuffer).toString("base64");

  await browser.close();

  res
    .type("application/pdf")
    .header(
      "Content-Disposition",
      `attachment; filename="fl-proposta-${req.params.cardId}.pdf"`
    )
    .status(200)
    .send(Buffer.from(base64String, "base64"));
});

const port = 3000;

app.listen(port, () =>
  console.log(`front-end server is online on http://localhost:${port}`)
);
