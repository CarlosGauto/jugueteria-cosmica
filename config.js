const PERSISTENCE_TYPES = {
    TYPE_MEM: 'MEMORY',
    TYPE_FILE: 'FILE SYSTEM',
    TYPE_MONGODB: 'MONGODB',
};

const config = {
    PORT: 8080,
    PERSISTENCE_TYPE: PERSISTENCE_TYPES.TYPE_MONGODB,
    MONGODB_CONNECTION_STR: 'mongodb+srv://Cgauto:juguetes@cluster0.slzdzyi.mongodb.net/?retryWrites=true&w=majority',
    MONGODB_TIMEOUT: 2000   // Valor bajo para testing.
};

export {PERSISTENCE_TYPES, config as default};
