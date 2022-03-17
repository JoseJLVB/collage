const express = require('express');
const expressFileUpload = require('express-fileupload');
const app = express();
const fs = require('fs').promises;
const nunjucks = require('nunjucks');
app.use(express.static('static'));
app.use(express.static('static/imgs'))



app.use( expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo excede el limite permitido",
})
);

nunjucks.configure('static', {
    express: app,
    autoescape: true,
    watch: true
})

app.get('/', async (req, res) => {
    res.render("formulario.html")
});


app.post('/imagen', async (req, res) => {
    const img = req.files.target_file;
    const posicion = req.body.posicion;
    console.log(img);
    console.log(posicion);
    await img.mv(`static/imgs/imagen-${posicion}.jpg`)

    res.redirect('/collage.html')
});

app.get('/collage', async (req, res) => {
    res.render('collage.html')
})


app.get('/deleteImg/:nombre', async (req, res) => {
    const  nombre  = req.params.nombre;
    console.log({borrar: nombre})
        await fs.unlink(`static/imgs/${nombre}`);
        res.redirect('/collage.html')
});
    
    
app.listen(3000, () => console.log('Servidor en puerto 3000'))