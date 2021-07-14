#include "TOTVS.CH"
#include "protheus.ch"
#Include "RESTFUL.CH"

WSRESTFUL APICLIENTES DESCRIPTION "API REST Tabela Clientes SA1" FORMAT APPLICATION_JSON

	WSMETHOD GET	DESCRIPTION 'Imprimir registros da Lista de Clientes'	WSSYNTAX '/APICLIENTES'  //-- Retorna lista de clientes
	WSMETHOD POST	DESCRIPTION 'Inserir registro na Lista de Clientes'		WSSYNTAX '/APICLIENTES'
	WSMETHOD PUT	DESCRIPTION 'Alterar registro na Lista de Clientes'		WSSYNTAX '/APICLIENTES'
	WSMETHOD DELETE	DESCRIPTION 'Remover registro na Lista de Clientes'		WSSYNTAX '/APICLIENTES'

END WSRESTFUL

WSMETHOD GET WSSERVICE APICLIENTES
	Local lRet:= .T.
	lRet := getClientes( self )
Return .T.

WSMETHOD POST WSSERVICE APICLIENTES
	Local lRet		:= .T.
	Local oJson		:= getBodyJSON( self )
	Local nOpc		:= 3 // inclusao
	Local aRet		:= {}
	Local cMsg		:= ""

	aRet := MCli(self, oJson, nOpc)
	lRet	:= aRet[1]
	cMsg 	:= aRet[2]

	if ValType(oJson) == "C"
		conout("Falha ao transformar texto em objeto json.")
		::setResponse("Falha ao transformar texto em objeto json.")
		lRet := .F.
	else
		conout(cMsg)
		::setResponse(cMsg)
	endif

Return .T.

WSMETHOD PUT WSSERVICE APICLIENTES
	Local lRet 		:= .T.
	Local oJson		:= getBodyJSON( self )
	Local nOpc		:= 4 // alteracao
	Local aRet		:= {}
	Local cMsg		:= ""

	aRet := MCli(self, oJson, nOpc)
	lRet	:= aRet[1]
	cMsg 	:= aRet[2]
	
	if ValType(oJson) == "C"
		conout("Falha ao transformar texto em objeto json.")
		::setResponse("Falha ao transformar texto em objeto json.")
		lRet := .F.
	else
		conout(cMsg)
		::setResponse(cMsg)
	endif

Return .T.

WSMETHOD DELETE WSSERVICE APICLIENTES
	Local lRet 		:= .T.
	Local oJson		:= getBodyJSON( self )
	Local nOpc		:= 5 // EXCLUSAO
	Local aRet		:= {}
	Local cMsg		:= ""

	aRet := MCli(self, oJson, nOpc)
	lRet	:= aRet[1]
	cMsg 	:= aRet[2]
	
	if ValType(oJson) == "C"
		conout("Falha ao transformar texto em objeto json.")
		::setResponse("Falha ao transformar texto em objeto json.")
		lRet := .F.
	else
		conout(cMsg)
		::setResponse(cMsg)
	endif

Return .T.

Static Function getClientes( oSelf )
	Local aListCli		:= {}
	Local cJsonCli      := ''
	Local oJsonCli		:= JsonObject():New()
	Local cWhere        := "AND SA1.A1_FILIAL = '"+xFilial('SA1')+"'"
	Local nCount        := 0
	Local nStart        := 1
	Local nAux          := 0
	Local cAliasSA1     := GetNextAlias()

	dbSelectArea('SA1')
	DbSetOrder(1)
	If SA1->( Columnpos('A1_MSBLQL') > 0 ) //verifica se o campo de controle de bloqueio existe, se sim filtra esse caso
		cWhere += " AND SA1.A1_MSBLQL <> '1'"
	EndIf

	cWhere := '%'+cWhere+'%' //monta a expressao where

	// Realiza a query para selecionar clientes
	BEGINSQL Alias cAliasSA1
        SELECT SA1.A1_COD, SA1.A1_NOME, SA1.A1_END, SA1.A1_LOJA, SA1.A1_TIPO, SA1.A1_END, SA1.A1_BAIRRO, SA1.A1_MUN, SA1.A1_EST
        FROM    %table:SA1% SA1
        WHERE   SA1.%NotDel%
        %exp:cWhere%
        ORDER BY A1_COD
	ENDSQL

	If ( cAliasSA1 )->( ! Eof() )
		// Posiciona no primeiro registro.
		( cAliasSA1 )->( DBGoTop() )

	Else
		// Nao encontrou registros
		oJsonCli['hasNext'] := .F.
	EndIf

	// Alimenta array de clientes
	While ( cAliasSA1 )->( ! Eof() )
		nCount++
		If nCount >= nStart
			nAux++
			aAdd( aListCli , JsonObject():New() )
			aListCli[nAux]['id']    	:= Alltrim( EncodeUTF8( ( cAliasSA1 )->A1_COD))
			aListCli[nAux]['loja']    	:= Alltrim( EncodeUTF8( ( cAliasSA1 )->A1_LOJA))
			aListCli[nAux]['nome']  	:= Alltrim( EncodeUTF8( ( cAliasSA1 )->A1_NOME ))
			aListCli[nAux]['tipo']    	:= Alltrim( EncodeUTF8( ( cAliasSA1 )->A1_TIPO))
			aListCli[nAux]['endereco']  := Alltrim( EncodeUTF8( ( cAliasSA1 )->A1_END))
			aListCli[nAux]['bairro']    := Alltrim( EncodeUTF8( ( cAliasSA1 )->A1_BAIRRO))
			aListCli[nAux]['cidade']    := Alltrim( EncodeUTF8( ( cAliasSA1 )->A1_MUN))
			aListCli[nAux]['estado']    := Alltrim( EncodeUTF8( ( cAliasSA1 )->A1_EST))

		EndIf
		( cAliasSA1 )->( DBSkip() )
	End
	( cAliasSA1 )->( DBCloseArea() )

	oJsonCli['clients'] := aListCli

	//-------------------------------------------------------------------
	// Serializa objeto Json
	//-------------------------------------------------------------------
	cJsonCli:= FwJsonSerialize( oJsonCli )

	//-------------------------------------------------------------------
	// Elimina objeto da memoria
	//-------------------------------------------------------------------
	FreeObj(oJsonCli)
	oself:SetResponse( cJsonCli ) //-- Seta resposta

Return .T.

static function getBodyJSON(oSelf)
	Local cBody		:= ''
	Local oJson		:= NIL

	cBody := oSelf:GetContent()
	oSelf:SetContentType("application/json")

	FwJsonDeserialize(cBody, @oJson)

return oJson

static function MCli(oSelf, oCli, nOpc)
	Local aRet		:= {.T., " "}
	local aCliArr
	Local aSA1Auto	:= {}
	Local cJsonRet	:= ""
	Local i

	Private lMsErroAuto	   := .F.

	aCliArr := ClassDataArr(oCli:SA1)
	For i := 1 To Len(aCliArr)
		aAdd(aSA1Auto, {aCliArr[i,1], aCliArr[i,2], Nil})
	Next i

	MSExecAuto({|a,b| CRMA980(a,b)}, aSA1Auto, nOpc)

	If lMsErroAuto
		aRet[1] := .F.

		If nOpc == 3
			cJsonRet := '"message": "Erro ao incluir o Cliente."'
		ElseIf nOpc == 4
			cJsonRet := '"message": "Erro ao alterar o Cliente."'
		ElseIf nOpc == 5
			cJsonRet := '"message": "Erro ao excluir o Cliente."'
		EndIf

	else
		aRet[1] := .T.

		If nOpc == 3
			cJsonRet := '"message": "Cliente Incluido com Sucesso."'
		ElseIf nOpc == 4
			cJsonRet := '"message": "Cliente Alterado com Sucesso."'
		ElseIf nOpc == 5
			cJsonRet := '"message": "Cliente Excluido com Sucesso."'
		EndIf
	Endif

		aRet[2]	:= cJsonRet

return aRet
