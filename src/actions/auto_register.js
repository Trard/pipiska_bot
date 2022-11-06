import { get_user, register_user } from "./db.js";

export default async function(ctx, next) {
    let id = ctx.message.from.id;

    if (!get_user(id)) {
        await register_user(id);
    }

    next();
}
