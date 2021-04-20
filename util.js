const fs = require("fs");
const path = require("path");
const Josh = require("@joshdb/core");

class Utils {
    getCommands(dir) {
        const commands = [];
        const command_files = this.getFiles(dir);
    
        command_files.forEach(command_file => {
            commands.push(require(`./${path.join(dir, command_file)}`))
        })

        return commands;
    }

    getFiles(path) {
        const files = []
        for (const file of fs.readdirSync(path)) {
            const fullPath = path + '/' + file
            if(fs.lstatSync(fullPath).isDirectory())
                this.getFiles(fullPath).forEach(x => files.push(file + '/' + x))
            else files.push(file)
        }
        return files
    }
}

class Friendlycoin {
    constructor() {
        this.db = new Josh({
            name: 'friendcoin',
            provider: require('@joshdb/sqlite'),
        });
    }

    get defaultUser() {
        return { coins: 0, inventory: [], speed: 300, mining: false };
    }

    async ensureUser(id) {
        const user = await this.db.get(id);
    
        if(!user) {
            this.setUser(id, this.defaultUser)
        }
    }

    async setUser(id, object) {
        await this.db.set(id, object);    
    }

    async getUser(id) {
        await this.ensureUser(id);
    
        return await this.db.get(id);
    }
}

module.exports = {Friendlycoin, Utils}