const fs = require('fs');

class Contenedor {

    constructor(nombre) {
        this.nombre = nombre;
        this.dataObj = [];
    }

    async save(obj) {
        try {
            await fs.promises.access(`./${this.nombre}`);
            try {
                let data = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
                this.dataObj = JSON.parse(data);
                obj.id = this.dataObj.length + 1;
                this.dataObj.push(obj);

                try {
                    await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(this.dataObj, 2));
                } catch (err) {
                    console.log('Error append', err);
                }
            } catch (err) {
                console.log('Error en acces', err);
            }
        } catch (err) {
            try {
                this.dataObj = [];
                obj.id = 1;
                this.dataObj.push(obj)
                await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(this.dataObj, 2));
            } catch (err) {
                console.log('Error en escritura', err);
            }
        }
        return obj.id;
    }

    async getByid(id) {
        try {
            let data = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            const dataObj = JSON.parse(data);
            if (dataObj.find(e => e.id === id)) {
                return dataObj.find(e => e.id === id);
            } else {
                return -1;
            }
        } catch (err) {
            console.log('Error getById', err);
        }
    }

    async getAll() {

        try {
            const data = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            const dataObj = JSON.parse(data);

            return dataObj;
        } catch (err) {
            console.log('Error getAll', err);
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            const dataObj = JSON.parse(data);
            if (dataObj.find(e => e.id === id)) {
                dataObj.splice(id - 1, 1);
                for (let i = id - 1; i < dataObj.length; i++) {
                    dataObj[i].id -= 1
                }
                await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(dataObj))
            } else {
                return -1;
            }
        } catch (err) {
            console.log('Error getById', err);
        }
    }

    async deleteAll() {
        try {
            let data = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            const dataObj = JSON.parse(data);

            dataObj.splice(0, dataObj.length);
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(dataObj))

        } catch (err) {
            console.log('Error getById', err);
        }
    }

    async updateProduct(obj, id) {
        let data = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
        const dataObj = JSON.parse(data);
        const productIndex = dataObj.findIndex(producto => producto.id === id)

        if (productIndex != -1) {
            for (const property in obj) {
                if (property === 'productos') {
                    dataObj[productIndex][property].push(obj[property])
                } else {
                    dataObj[productIndex][property] = obj[property]
                }

            }
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(dataObj, 2));

            return dataObj[productIndex]
        }
        return -1
    }

    async updateCarrito(obj, id) {
        let data = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
        const dataObj = JSON.parse(data);
        const productIndex = dataObj.findIndex(producto => producto.id === id)

        if (productIndex != -1) {
            for (const property in obj) {
                dataObj[productIndex][property] = obj[property]
            }
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(dataObj, 2));

            return dataObj[productIndex]
        }
        return -1
    }
}

module.exports = Contenedor;