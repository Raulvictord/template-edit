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
    <consulta><cabecalho><consulta>376</consulta><data_consulta>11/06/2024 09:12:12</data_consulta><ip_solicitante>18.228.23.32</ip_solicitante><documento_consultado>40558073000118</documento_consultado><consultas_mensais_restantes>48</consultas_mensais_restantes><status>0</status><mensagem>sucesso</mensagem></cabecalho><resposta><identificacao><mensagem></mensagem><cnpj>40558073000118</cnpj><situacao_cnpj>Ativo</situacao_cnpj><data_situacao>2021-01-26</data_situacao><data_consulta_receita_federal>2023-06-30</data_consulta_receita_federal><razao_social>RAUL VICTOR SANTANA RIBEIRO 43014063878</razao_social><razao_social_anterior></razao_social_anterior><nome_fantasia>DETECH</nome_fantasia><data_alteracao_razao_social></data_alteracao_razao_social><data_registro>2021-01-26</data_registro><orgao>JUCESP</orgao><orgao_atual></orgao_atual><inscricao_estadual>00686014784112</inscricao_estadual><inscricao_estadual_uf>SP</inscricao_estadual_uf><data_fundacao>2021-01-26</data_fundacao><data_encerramento></data_encerramento><situacao_sintegra>HABILITADO</situacao_sintegra><data_situacao_sintegra>2021-01-26</data_situacao_sintegra><data_consulta_sintegra>2022-08-16</data_consulta_sintegra><cnae>9511-8/00</cnae><cnae_descricao>REPAR MANUT COMPUTADORES E PERIFIERICOS</cnae_descricao><cnae_secundario>4753-9/00</cnae_secundario><cnae_secundario_descricao>COM VAREJ ESPECIALIZ ELETRODOMEST EQUIP</cnae_secundario_descricao><outros_cnaes><registro><cnae>5912-0/99</cnae><cnae_descricao>ATIV POS PROD CINEMATOGRAF VIDEOS PROGR</cnae_descricao></registro><registro><cnae>6190-6/99</cnae><cnae_descricao>OUT ATIV TELECOMUNICOES N ESPECIF ANTER</cnae_descricao></registro><registro><cnae>8599-6/03</cnae><cnae_descricao>TREINAMENTO EM INFORMATICA</cnae_descricao></registro></outros_cnaes><nire></nire><nire_uf></nire_uf><codigo_natureza_juridica>2135</codigo_natureza_juridica><natureza_juridica>EMPRESARIO (INDIVIDUAL)</natureza_juridica><segmento>COMERCIO VAREJISTA</segmento><quantidade_filiais>0</quantidade_filiais><filiais/><moeda_capital_inicial></moeda_capital_inicial><capital_inicial>0</capital_inicial><moeda_capital_atual>R$</moeda_capital_atual><capital_atual>5000</capital_atual><data_alteracao_capital></data_alteracao_capital></identificacao><localizacao_completa><mensagem></mensagem><matrizes><registro><endereco>R JOAO GOMES DOS SANTOS, 1349</endereco><complemento></complemento><bairro>JD PARAISO</bairro><cidade>TARABAI</cidade><uf>SP</uf><cep>19210000</cep><codigo_ibge>03553906</codigo_ibge><telefones/></registro></matrizes><filiais/></localizacao_completa><alerta_fraudes/><debitos/><protestos/><ccf/><cheque_motivo_21/><devolucao_informada_pelo_usuario/><score><registro><score>256</score><modelo_score>38</modelo_score><classificacao_numerico>14</classificacao_numerico><classificacao_alfabetico>E</classificacao_alfabetico><probabilidade>43.3</probabilidade><texto>De cada 100 empresas classificadas nesta classe de score, &#xE9; prov&#xE1;vel que 43 apresentem d&#xE9;bitos no mercado nos pr&#xF3;ximos 12 meses.</texto></registro></score><consultas/><socios><existem_mais_ocorrencias>SIM</existem_mais_ocorrencias><registro><nome>RAUL VICTOR SANTANA RIBEIRO</nome><documento>00043014063878</documento><tipo_documento>CPF</tipo_documento><situacao_documento>Regular</situacao_documento><data_entrada>2021-01-26</data_entrada><porcentagem_participacao>100,00</porcentagem_participacao><assina_pela_empresa>S</assina_pela_empresa><existe_debito>Sim</existe_debito><alerta_fraude>N&#xE3;o</alerta_fraude><restricoes_documento/></registro></socios><administradores/><participacoes_socios_adm_outras_empresas/><participacoes_empresas_consultadas/><decisao><flag>0003</flag><flag_descricao>N&#xC3;O RECOMENDADO</flag_descricao><descricao>Negocia&#xE7;&#xE3;o N&#xE3;o Recomendada</descricao></decisao><acoes_civeis/><falencias/></resposta></consulta>
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
