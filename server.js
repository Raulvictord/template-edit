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

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<consulta>
	<cabecalho>
		<consulta>341</consulta>
		<data_consulta>28/05/2024 18:13:39</data_consulta>
		<ip_solicitante>167.250.172.159</ip_solicitante>
		<documento_consultado>10920107850</documento_consultado>
		<status>0</status>
		<mensagem>sucesso</mensagem>
		<mensagem_status>sucesso</mensagem_status>
		<consultas_mensais_restantes>43</consultas_mensais_restantes>
	</cabecalho>
	<resposta>
		<identificacao>
			<pessoa>FISICA</pessoa>
			<documento>10920107850</documento>
			<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
			<nome_mae>GENI GUEDES NOGUEIRA</nome_mae>
			<data_nascimento>02/03/1978</data_nascimento>
			<rg></rg>
			<emissor_rg></emissor_rg>
			<uf_rg></uf_rg>
			<data_emissao_rg></data_emissao_rg>
			<sexo>MASCULINO</sexo>
			<nacionalidade>BRASILEIRO</nacionalidade>
			<estado_civil>NAO INFORMADO</estado_civil>
			<numero_dependentes></numero_dependentes>
			<escolaridade>POS GRADUACAO COMPLETA</escolaridade>
			<situacao_receita>REGULAR</situacao_receita>
			<data_atualizacao>18/06/2023</data_atualizacao>
			<regiao_cpf>SP-SAO PAULO</regiao_cpf>
			<obito></obito>
			<titulo_eleitor>237781160167</titulo_eleitor>
		</identificacao>
		<localizacao>
			<tipo>AV</tipo>
			<endereco>PRES JOAO GOULART</endereco>
			<numero>1</numero>
			<complemento>AP 132 BL DAKOTA</complemento>
			<bairro>UMUARAMA</bairro>
			<cidade>OSASCO</cidade>
			<uf>SP</uf>
			<cep>6036048</cep>
			<ddd1>21</ddd1>
			<telefone1>982444801</telefone1>
			<ddd2>11</ddd2>
			<telefone2>43769912</telefone2>
			<ddd3>55</ddd3>
			<telefone3>32215226</telefone3>
		</localizacao>
		<acoes/>
		<alertas/>
		<debitos/>
		<protestos/>
		<consultas_por_segmento>
			<registro>
				<pessoa>FISICA</pessoa>
				<documento>10920107850</documento>
				<ocorrencia>OU-OUTROS</ocorrencia>
				<data>28/05/2024</data>
				<moeda></moeda>
				<valor></valor>
				<informante>SP-SPO/INFORMBANK - BANCO DE INFORMA</informante>
				<atividade_ramo></atividade_ramo>
				<descricao_ramo></descricao_ramo>
				<atividade_segmento></atividade_segmento>
				<descricao_segmento></descricao_segmento>
				<atividade_grupo></atividade_grupo>
				<descricao_grupo></descricao_grupo>
			</registro>
			<registro>
				<pessoa>FISICA</pessoa>
				<documento>10920107850</documento>
				<ocorrencia>OU-OUTROS</ocorrencia>
				<data>15/05/2024</data>
				<moeda></moeda>
				<valor></valor>
				<informante>SP-SPO/INFORMBANK - BANCO DE INFORMA</informante>
				<atividade_ramo></atividade_ramo>
				<descricao_ramo></descricao_ramo>
				<atividade_segmento></atividade_segmento>
				<descricao_segmento></descricao_segmento>
				<atividade_grupo></atividade_grupo>
				<descricao_grupo></descricao_grupo>
			</registro>
			<registro>
				<pessoa>FISICA</pessoa>
				<documento>10920107850</documento>
				<ocorrencia>OU-OUTROS</ocorrencia>
				<data>06/03/2024</data>
				<moeda></moeda>
				<valor></valor>
				<informante>SP-SPO/INFORMBANK - BANCO DE INFORMA</informante>
				<atividade_ramo></atividade_ramo>
				<descricao_ramo></descricao_ramo>
				<atividade_segmento></atividade_segmento>
				<descricao_segmento></descricao_segmento>
				<atividade_grupo></atividade_grupo>
				<descricao_grupo></descricao_grupo>
			</registro>
		</consultas_por_segmento>
		<telefones/>
		<telefones_vinculados>
			<registro>
				<ddd>11</ddd>
				<telefone>43769912</telefone>
				<endereco>AV PRES JOAO GOULART 1 BL DAKOTA APT 132</endereco>
				<bairro>UMUARAMA</bairro>
				<cep>6036048</cep>
				<cidade>OSASCO</cidade>
				<uf>SP</uf>
			</registro>
		</telefones_vinculados>
		<confirmacao_cep/>
		<ccf/>
		<cheque_motivo_21/>
		<devolucao_informada_pelo_usuario/>
		<cheque_talao_sustado/>
		<resumo_devolucoes_informadas_pelo_ccf/>
		<resumo_consultas_anteriores_cheque/>
		<historico_cheque_informado/>
		<consultas_anteriores_cheque/>
		<resumo_devolucoes_informadas_pelo_usuario/>
		<grafias>
			<registro>
				<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
				<documento>10920107850</documento>
				<data_nascimento>02/03/1978</data_nascimento>
				<rg></rg>
				<tipo>AV</tipo>
				<endereco>ESTADOS UNIDOS</endereco>
				<numero>1</numero>
				<complemento>AP 132</complemento>
				<bairro>JD D'ABRIL</bairro>
				<cidade>OSASCO</cidade>
				<uf>SP</uf>
				<cep>6033190</cep>
				<ddd1>55</ddd1>
				<telefone1>32215226</telefone1>
				<ddd2></ddd2>
				<telefone2></telefone2>
				<ddd3></ddd3>
				<telefone3></telefone3>
			</registro>
			<registro>
				<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
				<documento>10920107850</documento>
				<data_nascimento>02/03/1978</data_nascimento>
				<rg></rg>
				<tipo>AV</tipo>
				<endereco>PRES JOAO GOULART</endereco>
				<numero>1</numero>
				<complemento>AP 68 ED DAKOT</complemento>
				<bairro>UMUARAMA</bairro>
				<cidade>OSASCO</cidade>
				<uf>SP</uf>
				<cep>6036048</cep>
				<ddd1>11</ddd1>
				<telefone1>976082493</telefone1>
				<ddd2></ddd2>
				<telefone2></telefone2>
				<ddd3></ddd3>
				<telefone3></telefone3>
			</registro>
			<registro>
				<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
				<documento>10920107850</documento>
				<data_nascimento>02/03/1978</data_nascimento>
				<rg></rg>
				<tipo>AV</tipo>
				<endereco>PRES JOAO GOULART</endereco>
				<numero>1</numero>
				<complemento>AP 132 ED DAKOT</complemento>
				<bairro>UMUARAMA</bairro>
				<cidade>OSASCO</cidade>
				<uf>SP</uf>
				<cep>6036048</cep>
				<ddd1>11</ddd1>
				<telefone1>976082493</telefone1>
				<ddd2></ddd2>
				<telefone2></telefone2>
				<ddd3></ddd3>
				<telefone3></telefone3>
			</registro>
			<registro>
				<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
				<documento>10920107850</documento>
				<data_nascimento>02/03/1978</data_nascimento>
				<rg></rg>
				<tipo>AV</tipo>
				<endereco>ESTADOS UNIDOS</endereco>
				<numero>1</numero>
				<complemento>AP 132 ED DAKOT</complemento>
				<bairro>JD D'ABRIL</bairro>
				<cidade>OSASCO</cidade>
				<uf>SP</uf>
				<cep>6033190</cep>
				<ddd1>11</ddd1>
				<telefone1>976082493</telefone1>
				<ddd2></ddd2>
				<telefone2></telefone2>
				<ddd3></ddd3>
				<telefone3></telefone3>
			</registro>
			<registro>
				<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
				<documento>10920107850</documento>
				<data_nascimento>02/03/1978</data_nascimento>
				<rg></rg>
				<tipo>AV</tipo>
				<endereco>NS DAS DORES</endereco>
				<numero>305</numero>
				<complemento>AP 1004 BLB</complemento>
				<bairro>NOSSA SENHORA DAS DORES</bairro>
				<cidade>SANTA MARIA</cidade>
				<uf>RS</uf>
				<cep>97050531</cep>
				<ddd1>55</ddd1>
				<telefone1>32215226</telefone1>
				<ddd2></ddd2>
				<telefone2></telefone2>
				<ddd3></ddd3>
				<telefone3></telefone3>
			</registro>
			<registro>
				<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
				<documento>10920107850</documento>
				<data_nascimento>02/03/1978</data_nascimento>
				<rg></rg>
				<tipo>AV</tipo>
				<endereco>ESTADOS UNIDOS</endereco>
				<numero>1</numero>
				<complemento>AP 132 ED D QD</complemento>
				<bairro>JD D'ABRIL</bairro>
				<cidade>OSASCO</cidade>
				<uf>SP</uf>
				<cep>6033190</cep>
				<ddd1>11</ddd1>
				<telefone1>976082493</telefone1>
				<ddd2></ddd2>
				<telefone2></telefone2>
				<ddd3></ddd3>
				<telefone3></telefone3>
			</registro>
			<registro>
				<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
				<documento>10920107850</documento>
				<data_nascimento>02/03/1978</data_nascimento>
				<rg></rg>
				<tipo>AV</tipo>
				<endereco>NS DAS DORES</endereco>
				<numero>305</numero>
				<complemento>AP 1004 BL B</complemento>
				<bairro>NOSSA SENHORA DAS DORES</bairro>
				<cidade>SANTA MARIA</cidade>
				<uf>RS</uf>
				<cep>97050531</cep>
				<ddd1></ddd1>
				<telefone1></telefone1>
				<ddd2></ddd2>
				<telefone2></telefone2>
				<ddd3></ddd3>
				<telefone3></telefone3>
			</registro>
			<registro>
				<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
				<documento>10920107850</documento>
				<data_nascimento>02/03/1978</data_nascimento>
				<rg></rg>
				<tipo>R</tipo>
				<endereco>MTO FORTUNATO NETO</endereco>
				<numero>161</numero>
				<complemento></complemento>
				<bairro>PARQUE ALVORADA</bairro>
				<cidade>PRESIDENTE PRUDENTE</cidade>
				<uf>SP</uf>
				<cep>19042080</cep>
				<ddd1></ddd1>
				<telefone1></telefone1>
				<ddd2></ddd2>
				<telefone2></telefone2>
				<ddd3></ddd3>
				<telefone3></telefone3>
			</registro>
			<registro>
				<nome>ALEXANDRE GUEDES NOGUEIRA</nome>
				<documento>10920107850</documento>
				<data_nascimento>02/03/1978</data_nascimento>
				<rg></rg>
				<tipo>AV</tipo>
				<endereco>BRASIL</endereco>
				<numero>2476</numero>
				<complemento></complemento>
				<bairro>VL INDUSTRIAL</bairro>
				<cidade>PRESIDENTE PRUDENTE</cidade>
				<uf>SP</uf>
				<cep>19013002</cep>
				<ddd1></ddd1>
				<telefone1></telefone1>
				<ddd2></ddd2>
				<telefone2></telefone2>
				<ddd3></ddd3>
				<telefone3></telefone3>
			</registro>
		</grafias>
		<participacoes>
			<registro>
				<razao_social>SEGUROTOTAL CORRETORA DE SEGUROS LTDA</razao_social>
				<pessoa>CNPJ</pessoa>
				<documento>52153156000106</documento>
				<moeda>R$</moeda>
				<valor>100,00</valor>
				<observacao>NAO CONSTA ALERTA PARA O CNPJ</observacao>
				<percentual>10000</percentual>
				<data_entrada>12/09/2023</data_entrada>
				<funcao_socio>SOCIO ADMINISTRADOR</funcao_socio>
				<pessoa_socio>CPF</pessoa_socio>
				<documento_socio>10920107850</documento_socio>
				<tipo_socio>SOCIO</tipo_socio>
			</registro>
			<registro>
				<razao_social>FORCECURE CORRETORA DE SEGUROS EIRELI</razao_social>
				<pessoa>CNPJ</pessoa>
				<documento>27162120000141</documento>
				<moeda>R$</moeda>
				<valor>200,00</valor>
				<observacao>NAO CONSTA ALERTA PARA O CNPJ</observacao>
				<percentual>10000</percentual>
				<data_entrada>02/09/2019</data_entrada>
				<funcao_socio>TITULAR PESSOA FISICA</funcao_socio>
				<pessoa_socio>CPF</pessoa_socio>
				<documento_socio>10920107850</documento_socio>
				<tipo_socio>SOCIO</tipo_socio>
			</registro>
		</participacoes>
		<falencias/>
		<score>
			<registro>
				<pessoa>FISICA</pessoa>
				<score>0504</score>
				<execucao>NAO</execucao>
				<descricao_score>63-NOVO RISCO 6 MESES</descricao_score>
				<classificacao_numerico>7</classificacao_numerico>
				<classificacao_alfabetico>C</classificacao_alfabetico>
				<provavel>01600</provavel>
				<texto>DE CADA 100 PESSOAS CLASSIFICADAS NESTA CLASSE DE SCORE, E PROVAVEL QUE 16 APRESENTEM DEBITOS NO MERCADO NOS PROXIMOS 6 MESES.</texto>
			</registro>
			<registro>
				<pessoa>FISICA</pessoa>
				<score>0006</score>
				<execucao>NAO</execucao>
				<descricao_score>41-RENDA PRESUM FAIXA</descricao_score>
				<classificacao_numerico>6</classificacao_numerico>
				<classificacao_alfabetico></classificacao_alfabetico>
				<provavel></provavel>
				<texto>DE R$ 3.001 ATE R$ 4.000</texto>
			</registro>
			<registro>
				<pessoa>FISICA</pessoa>
				<score>0569</score>
				<execucao>NAO</execucao>
				<descricao_score>39-PARCELA SEGURA PF</descricao_score>
				<classificacao_numerico></classificacao_numerico>
				<classificacao_alfabetico></classificacao_alfabetico>
				<provavel></provavel>
				<texto>VALOR DE PARCELA MENSAL SUGERIDA (EM REAIS)</texto>
			</registro>
		</score>
		<decisao>
			<pessoa>FISICA</pessoa>
			<documento>10920107850</documento>
			<score>0003</score>
			<aprovacao>SIM</aprovacao>
			<texto>NEGOCIACAO RECOMENDADA</texto>
		</decisao>
	</resposta>
</consulta>
`;

const xmlDefineNegocio = `<?xml version="1.0"?>
<consulta>
    <cabecalho>
        <data_consulta>05/04/2019 15:02:35</data_consulta>
        <ip_solicitante>127.0.0.1</ip_solicitante>
        <documento_consultado>00000000000000</documento_consultado>
        <status>0</status>
        <mensagem>sucesso</mensagem>
    </cabecalho>
    <resposta>
        <identificacao>
            <mensagem>MENSAGEM DE INFORMACAO</mensagem>
            <cnpj>00000000000191</cnpj>
            <situacao_cnpj>Ativo</situacao_cnpj>
            <data_situacao>2005-11-03</data_situacao>
            <data_consulta_receita_federal>2019-09-06</data_consulta_receita_federal>
            <razao_social>EMPRESA SA</razao_social>
            <razao_social_anterior>RAZAO ANTIGA</razao_social_anterior>
            <nome_fantasia>DIRECAO GERAL</nome_fantasia>
            <data_alteracao_razao_social>1990-09-09</data_alteracao_razao_social>
            <data_registro>1961-05-19</data_registro>
            <orgao>JUCEDF</orgao>
            <orgao_atual>JUCEDF</orgao_atual>
            <inscricao_estadual>00000000000000</inscricao_estadual>
            <inscricao_estadual_uf>DF</inscricao_estadual_uf>
            <data_fundacao>1966-08-01</data_fundacao>
            <data_encerramento>2019-10-10</data_encerramento>
            <situacao_sintegra>ISENTO (INEXISTENTE)</situacao_sintegra>
            <data_situacao_sintegra>2015-09-09</data_situacao_sintegra>
            <data_consulta_sintegra>2017-09-14</data_consulta_sintegra>
            <cnae>6422-1/00</cnae>
            <cnae_descricao>BANCOS MULTIPLOS COM CARTEIRA COMERCIAL</cnae_descricao>
            <cnae_secundario>6499-9/99</cnae_secundario>
            <cnae_secundario_descricao>OUTRAS ATIV SERVS FINANCEIROS N ESPECIFI</cnae_secundario_descricao>
            <outros_cnaes>
                <registro>
                    <cnae>6499-9/99</cnae>
                    <cnae_descricao>OUTRAS ATIV SERVS FINANCEIROS N ESPECIFI</cnae_descricao>
                </registro>
                <registro>
                    <cnae>6499-9/99</cnae>
                    <cnae_descricao>OUTRAS ATIV SERVS FINANCEIROS N ESPECIFI</cnae_descricao>
                </registro>
            </outros_cnaes>
            <nire>00000000000</nire>
            <nire_uf>DF</nire_uf>
            <codigo_natureza_juridica>2038</codigo_natureza_juridica>
            <natureza_juridica>SOCIEDADE ECONOMICA MISTA</natureza_juridica>
            <segmento>ECONOMIA</segmento>
            <quantidade_filiais>6202</quantidade_filiais>
            <filiais>
                <registro>
                    <filial>MANAUS/AM</filial>
                </registro>
                <registro>
                    <filial>BELEM/PA</filial>
                </registro>
            </filiais>
            <moeda_capital_inicial>CR$</moeda_capital_inicial>
            <capital_inicial>60000000000</capital_inicial>
            <moeda_capital_atual>R$</moeda_capital_atual>
            <capital_atual>54000000000</capital_atual>
            <data_alteracao_capital>2019-10-01</data_alteracao_capital>
        </identificacao>
        <localizacao_completa>
            <mensagem>MENSAGEM INFORMATIVA</mensagem>
            <matrizes>
                <registro>
                    <endereco>ENDERECO DA EMPRESA</endereco>
                    <complemento>CS</complemento>
                    <bairro>LUGAR BONITO</bairro>
                    <cidade>CIDADE LEGAL</cidade>
                    <uf>DF</uf>
                    <cep>00040912</cep>
                    <codigo_ibge>05300108</codigo_ibge>
                    <telefones>
                        <registro>
                            <telefone>(00) 0000-0000</telefone>
                        </registro>
                        <registro>
                            <telefone>(00) 0000-0000</telefone>
                        </registro>
                    </telefones>
                </registro>
            </matrizes>
            <filiais>
                <registro>
                    <endereco>ENDERECO DA FILIAL</endereco>
                    <complemento>CS</complemento>
                    <bairro>LUGAR BONITO</bairro>
                    <cidade>CIDADE LEGAL</cidade>
                    <uf>DF</uf>
                    <cep>70040912</cep>
                    <codigo_ibge>05300108</codigo_ibge>
                    <telefones>
                        <registro>
                            <telefone>(00) 0000-0000</telefone>
                        </registro>
                        <registro>
                            <telefone>(00) 0000-0000</telefone>
                        </registro>
                    </telefones>
                </registro>
            </filiais>
            <filiais/>
        </localizacao_completa>
        <alerta_fraudes>
            <registro>
                <mensagem>MENSAGEM INFORMATIVA</mensagem>
                <data_entrada>2010-10-12</data_entrada>
            </registro>
            <registro>
                <mensagem>MENSAGEM INFORMATIVA</mensagem>
                <data_entrada>2010-02-12</data_entrada>
            </registro>
        </alerta_fraudes>
        <debitos>
            <total_debitos>126</total_debitos>
            <total_credores>19</total_credores>
            <valor>185959,59</valor>
            <valor_primeiro>88,93</valor_primeiro>
            <valor_maior>90180,51</valor_maior>
            <data_primeiro>2014-04-19</data_primeiro>
            <data_maior>2018-06-13</data_maior>
            <periodo_inicial>2014-04-19</periodo_inicial>
            <periodo_final>2019-01-11</periodo_final>
            <existem_mais_ocorrencias>SIM</existem_mais_ocorrencias>
            <registro>
                <tipo_debito>XX</tipo_debito>
                <contrato>00000000</contrato>
                <data_ocorrencia>2019-01-11</data_ocorrencia>
                <data_exibicao>2019-02-11</data_exibicao>
                <valor>197,72</valor>
                <informante>EMPRESA 1 S/A - CONCESSI SERVI PUBLI</informante>
                <cidade>SAO PAULO</cidade>
                <uf>SP</uf>
            </registro>
            <registro>
                <tipo_debito>XX</tipo_debito>
                <contrato>00000000</contrato>
                <data_ocorrencia>2018-09-19</data_ocorrencia>
                <data_exibicao>2018-10-25</data_exibicao>
                <valor>2171,03</valor>
                <informante>TRIBUNAL DE JUSTICA DE SAO PAULO</informante>
                <cidade>SAO PAULO</cidade>
                <uf>SP</uf>
            </registro>
        </debitos>
        <protestos>
            <total_protestos>3545</total_protestos>
            <valor_total>164713877,73</valor_total>
            <valor_primeiro>121044,42</valor_primeiro>
            <valor_maior>39719262,35</valor_maior>
            <data_primeiro>2018-05-04</data_primeiro>
            <data_maior>2019-02-04</data_maior>
            <existem_mais_ocorrencias>SIM</existem_mais_ocorrencias>
            <registro>
                <cartorio>5</cartorio>
                <data>2019-04-03</data>
                <vencimento>2018-11-23</vencimento>
                <valor>998,22</valor>
                <cidade>SAO GONCALO</cidade>
                <estado>RJ</estado>
            </registro>
            <registro>
                <cartorio>5</cartorio>
                <data>2019-04-03</data>
                <vencimento>2018-11-23</vencimento>
                <valor>1636,61</valor>
                <cidade>SAO GONCALO</cidade>
                <estado>RJ</estado>
            </registro>
        </protestos>
        <ccf>
            <total_ccf>61</total_ccf>
            <total_nomes_relacionados>30</total_nomes_relacionados>
            <valor>400</valor>
            <valor_primeiro>21</valor_primeiro>
            <valor_maior>233</valor_maior>
            <data_primeiro>2019-02-02</data_primeiro>
            <data_maior>2019-02-02</data_maior>
            <periodo_inicial>STRING</periodo_inicial>
            <periodo_final>STRING</periodo_final>
            <existem_mais_ocorrencias>SIM</existem_mais_ocorrencias>
            <registro>
                <quantidade>3</quantidade>
                <motivo>12</motivo>
                <data_ultimo>2014-07-15</data_ultimo>
                <nome>IGREJA DEVEDORA</nome>
                <banco>000</banco>
                <nome_banco>BANCO COOPERATIVO SA</nome_banco>
                <agencia>0000</agencia>
            </registro>
            <registro>
                <quantidade>3</quantidade>
                <motivo>12</motivo>
                <data_ultimo>2015-02-02</data_ultimo>
                <nome>IGREJA DEVEDORA</nome>
                <banco>000</banco>
                <nome_banco>BANCO S.A.</nome_banco>
                <agencia>0000</agencia>
            </registro>
        </ccf>
        <cheque_motivo_21>
            <total>14</total>
            <periodo_inicial>2018-10-06</periodo_inicial>
            <periodo_final>2019-03-30</periodo_final>
            <existem_mais_ocorrencias>SIM</existem_mais_ocorrencias>
            <registro>
                <banco>0</banco>
                <agencia>0000</agencia>
                <cheque_inicial>00000000
                </cheque_inicial>
                <cheque_final>
                    00000000</cheque_final>
                <data_registro>2019-03-30</data_registro>
                <data_disponivel>2019-03-29</data_disponivel>
            </registro>
            <registro>
                <banco>0</banco>
                <agencia>0000</agencia>
                <cheque_inicial>00000000
                </cheque_inicial>
                <cheque_final>
                    00000000</cheque_final>
                <data_registro>2019-03-30</data_registro>
                <data_disponivel>2019-03-29</data_disponivel>
            </registro>
        </cheque_motivo_21>
        <devolucao_informada_pelo_usuario>
            <total>14</total>
            <periodo_inicial>2018-10-06</periodo_inicial>
            <periodo_final>2019-03-30</periodo_final>
            <existem_mais_ocorrencias>SIM</existem_mais_ocorrencias>
            <registro>
                <banco>0</banco>
                <agencia>0000</agencia>
                <cheque_inicial>00000000
                </cheque_inicial>
                <cheque_final>
                    00000000</cheque_final>
                <data_registro>2019-03-30</data_registro>
                <data_ocorrencia>2019-03-29</data_ocorrencia>
                <motivo>00</motivo>
                <informante>TRIBUNAL DE JUSTICA DE SAO PAULO</informante>
                <cidade>SAO PAULO</cidade>
                <uf>SP</uf>
            </registro>
            <registro>
                <banco>0</banco>
                <agencia>0000</agencia>
                <cheque_inicial>00000000
                </cheque_inicial>
                <cheque_final>
                    00000000</cheque_final>
                <data_registro>2019-03-30</data_registro>
                <data_ocorrencia>2019-03-29</data_ocorrencia>
                <motivo>00</motivo>
                <informante>TRIBUNAL DE JUSTICA DE SAO PAULO</informante>
                <cidade>SAO PAULO</cidade>
                <uf>SP</uf>
            </registro>
        </devolucao_informada_pelo_usuario>
        <score>
            <registro>
                <score>2</score>
                <modelo_score>38</modelo_score>
                <classificacao_numerico>17</classificacao_numerico>
                <classificacao_alfabetico>G</classificacao_alfabetico>
                <probabilidade>0.0</probabilidade>
                <texto>O risco não se aplica a esse porte de empresa.</texto>
            </registro>
        </score>
        <consultas>
            <total_consultas>7536</total_consultas>
            <periodo_inicial>2018-04-01</periodo_inicial>
            <periodo_final>2019-04-01</periodo_final>
            <existem_mais_ocorrencias>NÃO</existem_mais_ocorrencias>
            <consultas_mes>
                <registro>
                    <mes_ano>042019</mes_ano>
                    <quantidade>92</quantidade>
                </registro>
                <registro>
                    <mes_ano>032019</mes_ano>
                    <quantidade>481</quantidade>
                </registro>
            </consultas_mes>
            <registro>
                <razao_social>SP/FRIGORIFICO</razao_social>
                <cnpj>00000000000000</cnpj>
                <data>2019-04-05</data>
            </registro>
            <registro>
                <razao_social>SP/MEDICINA</razao_social>
                <cnpj>00000000000000</cnpj>
                <data>2019-04-05</data>
            </registro>
        </consultas>
        <administradores>
            <registro>
                <nome>ADMINISTRADOR 1</nome>
                <cpf>00000000000</cpf>
                <situacao_cpf>ATIVO</situacao_cpf>
                <data_entrada>2019-02-01</data_entrada>
                <tempo_mandato>2</tempo_mandato>
                <cargo>DIRETOR</cargo>
                <existe_debito>S</existe_debito>
                <alerta_fraude>N</alerta_fraude>
                <restricoes_documento>
                    <debitos>
                        <quantidade>21</quantidade>
                        <ultima>2019-01-01</ultima>
                        <valor>33</valor>
                    </debitos>
                    <ccf>
                        <quantidade>21</quantidade>
                        <ultima>2019-01-01</ultima>
                        <valor>33</valor>
                    </ccf>
                    <protestos>
                        <quantidade>21</quantidade>
                        <ultima>2019-01-01</ultima>
                        <valor>33</valor>
                    </protestos>
                    <acoes_judiciais>
                        <quantidade>21</quantidade>
                        <ultima>2019-01-01</ultima>
                        <valor>33</valor>
                    </acoes_judiciais>
                    <falencias>
                        <quantidade>21</quantidade>
                        <ultima>2019-01-01</ultima>
                        <valor>33</valor>
                    </falencias>
                    <consultas>
                        <quantidade>21</quantidade>
                        <ultima>2019-01-01</ultima>
                        <valor>33</valor>
                    </consultas>
                    <titulos_a_vencer>
                        <quantidade>21</quantidade>
                        <ultima>2019-01-01</ultima>
                        <valor>33</valor>
                    </titulos_a_vencer>
                    <pagamentos>
                        <quantidade>312</quantidade>
                        <ultima>2019-01-01</ultima>
                        <valor>23323</valor>
                    </pagamentos>
                </restricoes_documento>
            </registro>
        </administradores>
        <socios>
            <existem_mais_ocorrencias>NÃO</existem_mais_ocorrencias>
            <registro>
                <nome>EMPRESA 2</nome>
                <documento>00000000000000</documento>
                <tipo_documento>CNPJ</tipo_documento>
                <situacao_documento>ATIVO</situacao_documento>
                <data_entrada>1990-02-20</data_entrada>
                <porcentagem_participacao>60</porcentagem_participacao>
                <assina_pela_empresa>SIM</assina_pela_empresa>
                <existe_debito>SIM</existe_debito>
                <alerta_fraude>SIM</alerta_fraude>
                <restricoes_documento>
                    <debitos>
                        <quantidade>21</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0333</valor>
                    </debitos>
                    <ccf>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>        
                    </ccf>
                    <protestos>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </protestos>
                    <acoes_judiciais>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </acoes_judiciais>
                    <falencias>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </falencias>
                    <consultas>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </consultas>
                    <titulos_a_vencer>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </titulos_a_vencer>
                    <pagamentos>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </pagamentos>
                </restricoes_documento>
            </registro>
        </socios>
        <participacoes_empresas_consultadas>
            <existem_mais_ocorrencias>SIM</existem_mais_ocorrencias>
            <registro>
                <razao_social>EMPRESA 2</razao_social>
                <cnpj>000000000000000</cnpj>
                <situacao_cnpj>ATIVO</situacao_cnpj>
                <data_entrada>1990-02-20</data_entrada>
                <porcentagem_participacao>30</porcentagem_participacao>
                <existe_debito>SIM</existe_debito>
                <alerta_fraude>SIM</alerta_fraude>
                <restricoes_documento>
                    <debitos>
                        <quantidade>21</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0333</valor>
                    </debitos>
                    <ccf>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </ccf>
                    <protestos>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </protestos>
                    <acoes_judiciais>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </acoes_judiciais>
                    <falencias>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </falencias>
                    <consultas>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </consultas>
                    <titulos_a_vencer>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </titulos_a_vencer>
                    <pagamentos>
                        <quantidade>1</quantidade>
                        <ultima>2010-10-10</ultima>
                        <valor>0</valor>
                    </pagamentos>
                </restricoes_documento>
            </registro>
        </participacoes_empresas_consultadas>
        <participacoes_socios_adm_outras_empresas>
            <existem_mais_ocorrencias>SIM</existem_mais_ocorrencias>
            <registro>
                <nome_socio>SOCIO 1</nome_socio>
                <documento>00000000000</documento>
                <tipo_documento>CPF</tipo_documento>
                <socios_participantes>
                    <razao_social>EMPRESA 2</razao_social>
                    <cnpj>000000000000000</cnpj>
                    <situacao_cnpj>ATIVO</situacao_cnpj>
                    <data_entrada>1990-02-20</data_entrada>
                    <porcentagem_participacao>30</porcentagem_participacao>
                    <existe_debito>SIM</existe_debito>
                    <alerta_fraude>SIM</alerta_fraude>
                    <restricoes_documento>
                        <debitos>
                            <quantidade>21</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0333</valor>
                        </debitos>
                        <ccf>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </ccf>
                        <protestos>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </protestos>
                        <acoes_judiciais>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </acoes_judiciais>
                        <falencias>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </falencias>
                        <consultas>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </consultas>
                        <titulos_a_vencer>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </titulos_a_vencer>
                        <pagamentos>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </pagamentos>
                    </restricoes_documento>
                </socios_participantes>
                <socios_participantes>
                    <razao_social>EMPRESA 3</razao_social>
                    <cnpj>000000000000000</cnpj>
                    <situacao_cnpj>ATIVO</situacao_cnpj>
                    <data_entrada>1990-02-20</data_entrada>
                    <porcentagem_participacao>30</porcentagem_participacao>
                    <existe_debito>SIM</existe_debito>
                    <alerta_fraude>SIM</alerta_fraude>
                    <restricoes_documento>
                        <debitos>
                            <quantidade>21</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0333</valor>
                        </debitos>
                        <ccf>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </ccf>
                        <protestos>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </protestos>
                        <acoes_judiciais>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </acoes_judiciais>
                        <falencias>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </falencias>
                        <consultas>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </consultas>
                        <titulos_a_vencer>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </titulos_a_vencer>
                        <pagamentos>
                            <quantidade>1</quantidade>
                            <ultima>2010-10-10</ultima>
                            <valor>0</valor>
                        </pagamentos>
                    </restricoes_documento>
                </socios_participantes>
            </registro>
        </participacoes_socios_adm_outras_empresas>
        <decisao>
            <flag>0002</flag>
            <flag_descricao>NEUTRO</flag_descricao>
            <descricao>A decis?o n?o se aplica a esse porte de empresa. Analisar as demais informa??es do relat?rio.</descricao>
        </decisao>
        <acoes_civeis>
            <total_acoes>1431</total_acoes>
            <valor_total>222184020,78</valor_total>
            <valor_primeiro>11618,26</valor_primeiro>
            <valor_maior>130006770</valor_maior>
            <data_primeiro>2014-10-09</data_primeiro>
            <data_maior>2018-12-19</data_maior>
            <existem_mais_ocorrencias>SIM</existem_mais_ocorrencias>
            <registro>
                <documento>00000000000000</documento>
                <valor>0</valor>
                <requerido>EMPRESA</requerido>
                <acao>ACAO EXECUTIVA MUNICIPAL</acao>
                <foro>IPATINGA</foro>
                <vara>0</vara>
                <autor>MUNICIPIO DE IPATINGA</autor>
                <uf>MG</uf>
                <processo>00000000000</processo>
                <distribuicao>03/10/2019</distribuicao>
            </registro>
            <registro>
                <documento>00000000000000</documento>
                <valor>0</valor>
                <requerido>EMPRESA SA</requerido>
                <acao>ACAO EXECUTIVA</acao>
                <foro>TEOFILO OTONI</foro>
                <vara>1</vara>
                <autor>OUTRO AUTOR</autor>
                <uf>MG</uf>
                <processo>000000000000</processo>
                <distribuicao>01/10/2019</distribuicao>
            </registro>
        </acoes_civeis>
        <falencias>
            <total_falencias>1</total_falencias>
            <periodo_inicial>2010-10-10</periodo_inicial>
            <periodo_final>2010-10-10</periodo_final>
            <existem_mais_ocorrencias>NÃO</existem_mais_ocorrencias>
            <registro>
                <tipo_ocorrencia>TIPO DA OCORRENCIA</tipo_ocorrencia>
                <data>2010-10-10</data>
                <cidade>PARACAMBI</cidade>
                <uf>SP</uf>
                <vara>1</vara>
            </registro>
        </falencias>
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
