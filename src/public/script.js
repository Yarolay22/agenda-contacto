(async () => {

    const url = window.location.href + 'agenda-contacto'

    const formulario = document.querySelector('#formulario')
    const listContacto = document.querySelector('#listContacto')



    function getDataForm(evt) {
        const formData = {}

        for (const inputValue of evt.target) {

            if (['submit'].includes(inputValue.type)) {
                continue;
            }
            formData[inputValue.name] = inputValue.value
        }

        return formData;
    }

    async function sendResponse(url, method = 'GET', data = {}) {
        console.log({ url, method, data })

        let requestInit = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        if (['POST', 'PUT'].includes(method)) {
            requestInit['body'] = JSON.stringify(data)
        }

        const response = await fetch(url, requestInit);

        if (!response.ok) {
            throw new Error('Fallo el Servicio!!!')
        }

        return await response.json()
    }

    async function loadDataForm(evt) {
        const idContacto = evt.target.parentElement.getAttribute('data-id')

        const contacto = await sendResponse(url+'/'+idContacto)

        const payload = contacto.data.payload;

        formulario.dataset.id = payload._id;
        formulario.querySelector('#nombre').value = payload.nombre ?? ''
        formulario.querySelector('#telefono').value = payload.telefono ?? ''
        formulario.querySelector('#descripcion').value = payload.descripcion ?? ''
        formulario.querySelector('[type="submit"]').value = 'Editar Contacto';
    }

    async function getListadoContactos() {
        const contactos = await sendResponse(url);

        if (contactos.ok) {
            mostrarContactos(contactos.data)
        }
    }

    async function confirmarDelete(evt) {
        const idContacto = evt.target.parentElement.getAttribute('data-id')

        const contacto = await sendResponse(url+'/'+idContacto)

        const payload = contacto.data.payload;
        const checks = confirm(`¿Dese eliminar el contacot de ${payload.nombre}?`)
        if(!checks) return;

        const response = await sendResponse(url+'/'+payload._id, 'DELETE')
        
        if(response.ok) {
            await getListadoContactos();
        }
    }

    function mostrarContactos(contactos = []) {
        listContacto.innerHTML = '';
        const contactosEl = contactos.map((contacto) => `
            <div class="col-3" >
                <div class="card " style="height: 250px;">
                    <div class="card-header text-center">
                        ${contacto.nombre}
                    </div>
                    <div class="card-body d-flex flex-column justify-content-around">
                        <h5 class="card-title">${contacto.telefono}</h5>
                        <p class="card-text">${contacto.descripcion}</p>
                        <div class="d-flex gap-2" data-id=${contacto._id}>
                            <button class="btn btn-primary btnEditar">Editar</button>
                            <button class="btn btn-danger btnEliminar">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        listContacto.innerHTML = contactosEl

        listContacto.querySelectorAll('button.btnEditar').forEach((button) => {
            button.addEventListener('click', loadDataForm)
        })

        listContacto.querySelectorAll('button.btnEliminar').forEach((button) => {
            button.addEventListener('click', confirmarDelete)
        })
    }

   
    function appListeners() {
        formulario.addEventListener('submit', async (evt) => {
            evt.preventDefault();

            const dataId = evt.target.getAttribute('data-id')

            const dataForm = getDataForm(evt)

            let respuesta = undefined;

            if (dataId) {
                respuesta = await sendResponse(url+'/'+dataId, 'PUT', dataForm)
            }else {
                respuesta = await sendResponse(url, 'POST', dataForm)
            }

            if (respuesta?.ok) {
                await getListadoContactos()
            }

            formulario.reset();
            formulario.querySelector('[type="submit"]').value='Crear Contacto'

        });
    }




    async function main() {
        await getListadoContactos()
        appListeners();
    }


    await main();

})()