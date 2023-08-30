const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const { BaileysClass } = require('@bot-wa/bot-wa-baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword(['hola','hello'])
    .addAnswer([
        " Bienvenido a nuestro restaurante, ¿en qué puedo ayudarlo hoy? claro, tenemos una gran variedad de opciones para elegir", "¿Qué tipo de comida le gusta?"],
        { capture: true, 'buttons': [{ "body": "1. WHOPPER" }, { "body": " 2.WHOPPER DOBLE" },{"body":"3. WHOPPER CON QUESO Y TOCINETA"}] },
        async (ctx, { fallBack, flowDynamic,provider }) => {





            if (!ctx.body.includes("1. WHOPPER") && !ctx.body.includes("2.WHOPPER DOBLE") &&!ctx.body.includes("3. WHOPPER CON QUESO Y TOCINETA")) {
                await flowDynamic(['Opcción no valida'])
                await fallBack()
                return
            }

            if (ctx.body.includes("1. WHOPPER")) {
                await flowDynamic([" WHOPPER $6.50 https://burgerkingve.com/collections/a-la-carta/products/whopper"])
                await provider.sendMedia(ctx.from, "https://z1.pe/writable/tmp/thumb/1693316350_45544d7c2794976085b3.jpg"); 
                const sentMsg  = await provider.vendor.sendMessage( '584166753077@s.whatsapp.net', { text: ctx.body })
            }
            if (ctx.body.includes("2.WHOPPER DOBLE")) {
                await flowDynamic(["   WHOPPER DOBLE $8.50 https://burgerkingve.com/collections/a-la-carta/products/whopper-doble"])
                await provider.sendMedia(ctx.from, "https://z1.pe/writable/tmp/thumb/1693316350_1b070dca3b0a8645848a.jpg"); 
                const sentMsg  = await provider.vendor.sendMessage( '584166753077@s.whatsapp.net', { text: ctx.body })
            }
            if (ctx.body.includes("3. WHOPPER CON QUESO Y TOCINETA")) {
                await flowDynamic([" WHOPPER CON QUESO Y TOCINETA https://burgerkingve.com/collections/a-la-carta/products/whopper-con-queso-y-tocineta"])
                await provider.sendMedia(ctx.from, "https://z1.pe/writable/tmp/thumb/1693316350_1aa84d09fc1dbfab0278.jpg"); 
                const sentMsg  = await provider.vendor.sendMessage( '120363169127891095@g.us', { text: ctx.body })
              
                
                    
               
               

                 }


        },
        []
    )
  



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysClass)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
