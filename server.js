// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const express = require("express");
const puppeteer = require("puppeteer");
const render = require("ejs");
const fs = require("fs");
const path = require("path");
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const app = express();

// eslint-disable-next-line no-undef
const baseDir = `${__dirname}/dist`;

// app.use(express.static(`${baseDir}`))

const xml = `<?xml version="1.0"?>
<consulta>
    <cabecalho>
        <data_consulta>28/03/2019 11:10:17</data_consulta>
        <ip_solicitante>127.0.0.1</ip_solicitante>
        <documento_consultado>00000000000</documento_consultado>
        <status>0</status>
        <mensagem>sucesso</mensagem>
    </cabecalho>
    <resposta>
        <identificacao>
            <pessoa>FISICA</pessoa>
            <documento>00000000000</documento>
            <nome>GOMES FERREIRA</nome>
            <nome_mae>FOMES FERREIRA</nome_mae>
            <data_nascimento>1958-12-10</data_nascimento>
            <rg>121231238</rg>
            <emissor_rg>DETRAN</emissor_rg>
            <uf_rg>SP</uf_rg>
            <data_emissao_rg>2000-01-01</data_emissao_rg>
            <sexo>MASCULINO</sexo>
            <nacionalidade>BRASILEIRO</nacionalidade>
            <estado_civil>CASADO</estado_civil>
            <numero_dependentes>2</numero_dependentes>
            <escolaridade>POS GRADUACAO INCOMPLETA</escolaridade>
            <situacao_receita>PENDENTE DE REGULARIZACAO</situacao_receita>
            <data_atualizacao>2019-09-23</data_atualizacao>
            <regiao_cpf>CE,MA,PI</regiao_cpf>
            <obito>NAO</obito>
            <titulo_eleitor>123123123</titulo_eleitor>
        </identificacao>
        <localizacao>
            <tipo>R</tipo>
            <endereco>XV DE OUTUBRO</endereco>
            <numero>9</numero>
            <complemento>CS</complemento>
            <bairro>CENTRO</bairro>
            <cidade>BRAGANCA DO SUL</cidade>
            <uf>RJ</uf>
            <cep>00000000</cep>
            <ddd1>00</ddd1>
            <telefone1>000000000</telefone1>
            <ddd2>00</ddd2>
            <telefone2>00000000</telefone2>
            <ddd3>00</ddd3>
            <telefone3>00000000</telefone3>
        </localizacao>
        <grafias>
            <registro>
                <nome>GOMES FERREIRA</nome>
                <documento>00000000000</documento>
                <data_nascimento>1958-12-10</data_nascimento>
                <rg>000000000</rg>
                <tipo>R</tipo>
                <endereco>ENDERECO</endereco>
                <numero>1</numero>
                <complemento>CS</complemento>
                <bairro>CENTRO</bairro>
                <cidade>REGISTRO</cidade>
                <uf>SP</uf>
                <cep>11900000</cep>
                <ddd1>00</ddd1>
                <telefone1>00000000</telefone1>
                <ddd2>00</ddd2>
                <telefone2>00000000</telefone2>
                <ddd3>00</ddd3>
                <telefone3>00000000</telefone3>
            </registro>
            <registro>
                <nome>GOMES FERREIRA</nome>
                <documento>00000000000</documento>
                <data_nascimento>1958-12-10</data_nascimento>
                <rg>000000000</rg>
                <tipo>R</tipo>
                <endereco>ENDERECO</endereco>
                <numero>1</numero>
                <complemento>CS</complemento>
                <bairro>CENTRO</bairro>
                <cidade>REGISTRO</cidade>
                <uf>SP</uf>
                <cep>11900000</cep>
                <ddd1>00</ddd1>
                <telefone1>00000000</telefone1>
                <ddd2>00</ddd2>
                <telefone2>00000000</telefone2>
                <ddd3>00</ddd3>
                <telefone3>00000000</telefone3>
            </registro>
        </grafias>
        <acoes>
            <resumo>
                <mensagem>ACAO RETORNADA</mensagem>
                <total>14</total>
                <data_primeira>2019-02-02</data_primeira>
                <data_ultima>2019-03-03</data_ultima>
            </resumo>
            <registro>
                <vara>23</vara>
                <processo>321</processo>
                <acao>TRABALHISTA</acao>
                <data>2019-08-08</data>
                <autor>CARLOS</autor>
                <valor>201,00</valor>
                <praca>BRAGANCA</praca>
                <uf>SP</uf>
                <codigo>2</codigo>
            </registro>
            <registro>
                <vara>38</vara>
                <processo>123</processo>
                <acao>TRABALHISTA</acao>
                <data>2019-08-08</data>
                <autor>CARLOS</autor>
                <valor>201,00</valor>
                <praca>BRAGANCA</praca>
                <uf>SP</uf>
                <codigo>2</codigo>
            </registro>
        </acoes>
        <alertas>
            <registro>
                <mensagem>RIO DE JANEIRO</mensagem>
                <origem>RJ</origem>
                <tipo>90-ALERTA DE DOCUMENTOS</tipo>
            </registro>
            <registro>
                <mensagem>ATENCAO: CONSTA ALERTA DE DOCUMENTOS ROUBADOS OU EXTRAVIADOS</mensagem>
                <origem>RJ</origem>
                <tipo>90-ALERTA DE DOCUMENTOS</tipo>
            </registro>
        </alertas>
        <telefones>
            <registro>
                <ddd>21</ddd>
                <telefone>00002567</telefone>
                <nome>NOME DE TESTE</nome>
                <documento>00000000000</documento>
                <endereco>R DOMINIQUE LEVEL 0000018 AP</endereco>
                <bairro>CENTRO</bairro>
                <cep>26600000</cep>
                <cidade>PARACAMBI</cidade>
                <uf>RJ</uf>
            </registro>
        </telefones>
        <telefones_vinculados>
            <registro>
                <ddd>00</ddd>
                <telefone>00000000</telefone>
                <endereco>RUA QUINZE</endereco>
                <bairro>BRAGANCA 1</bairro>
                <cep>2700000</cep>
                <cidade>BRAGANCA</cidade>
                <uf>SP</uf>
            </registro>
            <registro>
                <ddd>99</ddd>
                <telefone>999999999</telefone>
                <endereco>RUA QUINZE</endereco>
                <bairro>BRAGANCA 1</bairro>
                <cep>2700000</cep>
                <cidade>BRAGANCA</cidade>
                <uf>SP</uf>
            </registro>
        </telefones_vinculados>
        <confirmacao_cep>
            <registro>
                <cep>2700000</cep>
                <endereco>RUA QUINZE</endereco>
                <bairro>FLORES</bairro>
                <cidade>BRAGANCA</cidade>
                <uf>SP</uf>
            </registro>
        </confirmacao_cep>
        <consultas_por_segmento>
            <registro>
                <pessoa>FISICA</pessoa>
                <documento>00000000000</documento>
                <ocorrencia>OU-OUTROS</ocorrencia>
                <data>2019-10-02</data>
                <moeda>R$</moeda>
                <valor>123,12</valor>
                <informante>SISTEMA DE CONSULTAS</informante>
                <atividade_ramo>9999998</atividade_ramo>
                <descricao_ramo>SEM CODIFICACAO</descricao_ramo>
                <atividade_segmento>6</atividade_segmento>
                <descricao_segmento>AUTOMOTIVO</descricao_segmento>
                <atividade_grupo>5</atividade_grupo>
                <descricao_grupo>O PROPRIO EMITENTE</descricao_grupo>
            </registro>
            <registro>
                <pessoa>FISICA</pessoa>
                <documento>00000000000</documento>
                <ocorrencia>CD-CREDITO DIRETO</ocorrencia>
                <data>2019-10-01</data>
                <moeda>R$</moeda>
                <valor>123,23</valor>
                <informante>SOPHUS INFORMATICA S/C LTDA</informante>
                <atividade_ramo>4751200</atividade_ramo>
                <descricao_ramo>COM VAREJ EQUIP SUPRIMENTOS INFORMATICA</descricao_ramo>
                <atividade_segmento>6</atividade_segmento>
                <descricao_segmento>AUTOMOTIVO</descricao_segmento>
                <atividade_grupo>2</atividade_grupo>
                <descricao_grupo>COMERCIO</descricao_grupo>
            </registro>
        </consultas_por_segmento>
        <debitos>
            <registro>
                <tipo_debito>RG</tipo_debito>
                <descricao_debito>RG</descricao_debito>
                <contrato>3226010045922060</contrato>
                <data_ocorrencia>2014-12-21</data_ocorrencia>
                <data_exibicao>2017-11-28</data_exibicao>
                <moeda>R$</moeda>
                <valor>685,07</valor>
                <situacao>COMPRADOR</situacao>
                <informante>RENOVA CIA SECURIT CREDITO FINANC</informante>
                <consulente>NAO</consulente>
                <cidade>SCPC SAO PAULO</cidade>
                <uf>SP</uf>
                <condicao>ATIVO</condicao>
            </registro>
        </debitos>
        <protestos>
            <registro>
                <tipo>TITULO PROTESTADO</tipo>
                <cartorio>1</cartorio>
                <data>2018-08-22</data>
                <moeda>R$</moeda>
                <valor>475</valor>
                <praca>BRAGANCA PAULISTA</praca>
                <estado>SP</estado>
            </registro>
            <registro>
                <tipo>TITULO PROTESTADO</tipo>
                <cartorio>2</cartorio>
                <data>2018-08-07</data>
                <moeda>R$</moeda>
                <valor>475</valor>
                <praca>BRAGANCA PAULISTA</praca>
                <estado>SP</estado>
            </registro>
        </protestos>
        <ccf>
            <registro>
                <mensagem>Mensagem informativa</mensagem>
                <tipo>Tipo da Devolucao</tipo>
                <pessoa>cpf</pessoa>
                <documento>123123123</documento>
                <nome>Raimundo Nonato</nome>
                <banco>341</banco>
                <agencia></agencia>
                <motivo_12>
                    <total>1</total>
                    <data_ultimo>02/02/2022</data_ultimo>
                    <alinea>12</alinea>
                </motivo_12>
                <motivo_13>
                    <total>2</total>
                    <data_ultimo>04/02/2022</data_ultimo>
                    <alinea>13</alinea>
                </motivo_13>
                <motivo_14>
                    <total>4</total>
                    <data_ultimo>02/02/2022</data_ultimo>
                    <alinea></alinea>
                </motivo_14>
                <motivo_99>
                    <total>8</total>
                    <data_ultimo>05/02/2022</data_ultimo>
                    <alinea>12</alinea>
                </motivo_99>
            </registro>
        </ccf>
        <cheque_motivo_21>
            <registro>
                <tipo>Tipo da restricao</tipo>
                <pessoa>cpf</pessoa>
                <documento>12312312387</documento>
                <banco>341</banco>
                <agencia>99</agencia>
                <conta>43</conta>
                <cheque_inicial>2</cheque_inicial>
                <cheque_final>5</cheque_final>
                <alinea_numero>65</alinea_numero>
                <alinea_descricao>Descrição da alinea</alinea_descricao>
                <data_registro>06/05/2021</data_registro>
                <data_disponivel>10/05/2021</data_disponivel>
                <moeda>R$</moeda>
                <valor>1500</valor>
                <valorn>1200,00</valorn>
                <informante>Mensagem do informante</informante>
            </registro>
        </cheque_motivo_21>
        <devolucao_informada_pelo_usuario>
            <registro>
                <mensagem>Mensagem</mensagem>
                <tipo>Tipo da devolucao</tipo>
                <pessoa>cpf</pessoa>
                <documento>12312312387</documento>
                <banco>675</banco>
                <agencia>12</agencia>
                <conta>454545</conta>
                <cheque_inicial>8</cheque_inicial>
                <cheque_final>9</cheque_final>
                <alinea_numero>2</alinea_numero>
                <alinea_descricao>Descrição da Alinea</alinea_descricao>
                <data_registro>03/02/2022</data_registro>
                <data_disponivel>05/02/2022</data_disponivel>
                <moeda>R$</moeda>
                <valor>4000</valor>
                <valorn>3000,00</valorn>
                <informante>Mensagem do informante</informante>
                <cidade>Tres Rios</cidade>
                <uf>MG</uf>
            </registro>
        </devolucao_informada_pelo_usuario>
        <cheque_talao_sustado>
            <registro>
                <mensagem>Mensagem informativa</mensagem>
                <ocorrencia>Tipo da ocorrencia</ocorrencia>
                <tipo_documento>cpf</tipo_documento>
                <numero_documento>12312312387</numero_documento>
                <banco>765</banco>
                <agencia>7</agencia>
                <conta>54</conta>
                <cheque>89</cheque>
                <alinea_numero>3</alinea_numero>
                <alinea_descricao>4</alinea_descricao>
                <data_ocorrencia>06/02/2022</data_ocorrencia>
                <data_disponibilizacao>08/02/2022</data_disponibilizacao>
                <descricao_informante>Nome do informante</descricao_informante>
                <numero_indicador_cheque_talao>Nome do indicador</numero_indicador_cheque_talao>
                <descricao_indicador_cheque_talao>Dado da indicação</descricao_indicador_cheque_talao>
            </registro>
        </cheque_talao_sustado>
        <resumo_devolucoes_informadas_pelo_ccf>
            <registro>
                <mensagem>Mensagem informativa</mensagem>
                <tipo_documento>cpf</tipo_documento>
                <numero_documento>12312312387</numero_documento>
                <nome>Sr.Raimundo nonato</nome>
                <totalizador>655</totalizador>
                <total_devolvidos>8</total_devolvidos>
                <total_devolvidos_motivo_12>7</total_devolvidos_motivo_12>
                <total_devolvidos_motivo_13>7</total_devolvidos_motivo_13>
                <total_devolvidos_motivo_14>8</total_devolvidos_motivo_14>
                <total_devolvidos_motivo_99>1</total_devolvidos_motivo_99>
            </registro>
        </resumo_devolucoes_informadas_pelo_ccf>
        <resumo_consultas_anteriores_cheque>
            <registro>
                <mensagem>Mensagem informativa</mensagem>
                <tipo_documento>cpf</tipo_documento>
                <documento>12312312387</documento>
                <total_de_consultas>7</total_de_consultas>
                <data_primeira_consulta>06/02/2022</data_primeira_consulta>
                <data_ultima_consulta>10/02/2022</data_ultima_consulta>
            </registro>
        </resumo_consultas_anteriores_cheque>
        <historico_cheque_informado>
            <registro>
                <mensagem>Mensagem informativa</mensagem>
                <tipo_documento>cpf</tipo_documento>
                <documento>12312312387</documento>
                <banco>341</banco>
                <agencia>7676</agencia>
                <conta>8787</conta>
                <numero_do_cheque>723487283748375</numero_do_cheque>
                <dados_da_consulta_data>06/02/2022</dados_da_consulta_data>
                <dados_da_consulta_hora></dados_da_consulta_hora>
                <dados_da_consulta_rede_loja>S</dados_da_consulta_rede_loja>
            </registro>
        </historico_cheque_informado>
        <consultas_anteriores_cheque>
            <registro>
                <mensagem>Mensagem informativa</mensagem>
                <tipo_documento>cpf</tipo_documento>
                <documento>12312312387</documento>
                <consulta_hora>10:05:06</consulta_hora>
                <consulta_data>20/01/2020</consulta_data>
                <consulta_moeda>R$</consulta_moeda>
                <consulta_valor>1500</consulta_valor>
                <consulta_informante>Nome do informante</consulta_informante>
            </registro>
        </consultas_anteriores_cheque>
        <resumo_devolucoes_informadas_pelo_usuario>
            <registro>
                <mensagem>Mensagem informativa</mensagem>
                <tipo_documento>cpf</tipo_documento>
                <documento>12312312387</documento>
                <total_de_devolucoes>5</total_de_devolucoes>
                <data_primeira_devolucao>10/01/2019</data_primeira_devolucao>
                <data_ultima_devolucao>10/02/2021</data_ultima_devolucao>
            </registro>
        </resumo_devolucoes_informadas_pelo_usuario>
        <score>
            <registro>
                <pessoa>FISICA</pessoa>
                <score>0111</score>
                <execucao>NAO</execucao>
                <descricao_score>63-NOVO RISCO 6 MESES</descricao_score>
                <classificacao_numerico>15</classificacao_numerico>
                <classificacao_alfabetico>E</classificacao_alfabetico>
                <provavel>09880</provavel>
                <texto>DE CADA 100 PESSOAS CLASSIFICADAS NESTA CLASSE DE SCORE, E PROVAVEL QUE 99 APRESENTEM DEBITOS NO MERCADO NOS PROXIMOS 6 MESES.</texto>
            </registro>
            <registro>
                <pessoa>FISICA</pessoa>
                <score>0006</score>
                <execucao>NAO</execucao>
                <descricao_score>41-RENDA PRESUM FAIXA</descricao_score>
                <classificacao_numerico>6</classificacao_numerico>
                <classificacao_alfabetico>D</classificacao_alfabetico>
                <provavel>PROBABILIDADE</provavel>
                <texto>DE R$ 3.001 ATE R$ 4.000</texto>
            </registro>
            <registro>
                <pessoa>FISICA</pessoa>
                <score>0009</score>
                <execucao>NAO</execucao>
                <descricao_score>39-LIMITE DE PARCELA</descricao_score>
                <classificacao_numerico>0</classificacao_numerico>
                <classificacao_alfabetico>C</classificacao_alfabetico>
                <provavel>PROBABILIDADE</provavel>
                <texto>VALOR DE PARCELA NAO CALCULADO, POIS A NEGOCIACAO NAO E RECOMENDAVEL.</texto>
            </registro>
        </score>
        <falencias>
            <registro>
                <tipo>FISICA</tipo>
                <vara>1</vara>
                <data>2019-02-02</data>
                <praca>BRAGANCA</praca>
                <uf>SP</uf>
                <codigo>12312323</codigo>
            </registro>
            <registro>
                <tipo>FISICA</tipo>
                <vara>1</vara>
                <data>2019-02-02</data>
                <praca>BRAGANCA</praca>
                <uf>SP</uf>
                <codigo>12312323</codigo>
            </registro>
        </falencias>
        <participacoes>
            <registro>
                <razao_social>EMPRESA BRAGAN EXEMPLO</razao_social>
                <pessoa>JURIDICA</pessoa>
                <documento>00000000000000</documento>
                <moeda>R$</moeda>
                <valor>124,24</valor>
                <observacao>OBSERVACAO OBSERVATORIA</observacao>
                <percentual>60</percentual>
                <data_entrada>2019-08-08</data_entrada>
                <funcao_socio>GERENTE GERAL</funcao_socio>
                <pessoa_socio>FISICA</pessoa_socio>
                <documento_socio>00000000000</documento_socio>
                <tipo_socio>MINORITARIO</tipo_socio>
            </registro>
            <registro>
                <razao_social>EMPRESA CARIOCA EXEMPLO</razao_social>
                <pessoa>JURIDICA</pessoa>
                <documento>00000000000000</documento>
                <moeda>R$</moeda>
                <valor>142,42</valor>
                <observacao>NADA A OBSERVAR</observacao>
                <percentual>35</percentual>
                <data_entrada>2019-08-08</data_entrada>
                <funcao_socio>DIRETOR GERAL</funcao_socio>
                <pessoa_socio>FISICA</pessoa_socio>
                <documento_socio>00000000000</documento_socio>
                <tipo_socio>MINORITARIO</tipo_socio>
            </registro>
        </participacoes>
        <decisao>
            <pessoa>FISICA</pessoa>
            <documento>00000000000</documento>
            <score>0002</score>
            <aprovacao>NAO</aprovacao>
            <texto>NEGOCIACAO NAO RECOMENDADA</texto>
        </decisao>
    </resposta>
</consulta>
`;

function convertXML(xml){
  return new Promise((resolve,reject)=>{
    /* const parser = new parser(); */
    parser.parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

app.get("*", async (req, res) => {
  const dataXML = await convertXML(xml);
  /* try{
    
    res.status(200).json(data);
  } catch(error){
    console.error('Erro XML',error);
    res.status(500).json({error:'Erro XML'});
  } */

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
    consulta: dataXML?.consulta,
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
