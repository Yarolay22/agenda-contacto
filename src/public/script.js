(() => {


    const formulario = document.querySelector('#formulario')



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

    async function sendResponse(url, method, data = {}) {
        console.log({ url, method, data })
        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }


    formulario.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const dataForm = getDataForm(evt)
        const respuesta = await sendResponse(window.location.href, 'POST', dataForm)
        console.log(respuesta)
    })
})()