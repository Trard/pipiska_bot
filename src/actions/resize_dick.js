import Mustache from "mustache";
import { locale } from "../index.js";

import {
    resize_dick,
    get_user,
    get_position
} from "../db.js";

const max_random = 10;
const min_random = -5;

function getRandomDickResize() {
    let max = max_random - 1;
    let min = min_random;
    
    let result = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    if (result == 0) {
        result = max_random;
    }

    return result
}

export default async function(ctx) {
    let id = ctx.message.from.id;

    let resize = getRandomDickResize();
    await resize_dick(id, ctx.chat.id, resize);

    let user = get_user(id, ctx.chat.id);
    let current_position = get_position(id, ctx.chat.id);
    
    if (resize > 0) {
        ctx.reply(Mustache.render(locale.dick_grew_up, {
            name: user.name,
            id: id,
            value: resize,
            new_value: user.size,
            current_position: current_position
        }), { parse_mode: "markdown" });
    } else if (resize < 0) {
        ctx.reply(Mustache.render(locale.dick_shruck, {
            name: user.name,
            id: id,
            value: -resize,
            new_value: user.size,
            current_position: current_position
        }), { parse_mode: "markdown" });
    } else {
        throw new Error("Size must not equal 0")
    }
}
