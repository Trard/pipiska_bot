import { UserDoesNotExistError, UserAlreadyExistsError } from './db/error.js'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Configure lowdb to write to JSONFile
const adapter = new JSONFile("db.json"); // project root
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read();
db.data ||= { users: [] };

export * from './db/error.js'

export async function register_user(id) {
    if (get_user(id)) {
        throw UserAlreadyExistsError(id)
    }

    db.data.users.push({ size: 0, id: id, last_grew_up: 0 });

    await db.write();
}

export function get_user(id) {
    let user = db.data.users.find(user => user.id === id);

    if (user === -1) {
        throw UserDoesNotExistError(id);
    }

    return user;
}

export async function resize_dick(id, size) {
    let user = get_user(id);

    user.size += size;

    await db.write();
}

export async function update_last_grew_up(id, timestamp) {
    let user = get_user(id);

    user.last_grew_up = timestamp;

    await db.write()
}

export function get_position(id) {
    let users = db.data.users;
    
    users.sort((a, b) => a.size > b.size ? 1 : -1);

    let position = users.findIndex(user => user.id === id);

    if (position === -1) {
        throw UserDoesNotExistError(id);
    }

    return position + 1;
}
