import { get_user, register_user } from "../db.js";

export default async function(ctx, next) {
    let author = ctx.message.from;
    let id = author.id;

    if (!get_user(id)) {
        let name = author.first_name;
    
        if (author.last_name) {
            name += ` ${author.last_name}`;
        }

        await register_user(id, name);
    }

    next();
}
