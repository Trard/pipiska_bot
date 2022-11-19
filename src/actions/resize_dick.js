import Mustache from "mustache";
import { locale } from "../index.js";

import { resize_dick, get_user, get_position } from "../db.js";

const max = 10;
const min = -5;

const grow_factor = 0.85;

function get_random_dick_resize() {
  let result;

  if (grow_factor >= Math.random()) {
    result = Math.floor(Math.random() * (max + 1));
  } else {
    result = Math.floor(Math.random() * (min + 1));
  }

  return result;
}

export default async function (ctx) {
  let id = ctx.message.from.id;

  let resize = get_random_dick_resize();
  await resize_dick(id, ctx.chat.id, resize);

  let user = get_user(id, ctx.chat.id);
  let current_position = get_position(id, ctx.chat.id);

  if (resize > 0) {
    ctx.reply(
      Mustache.render(locale.dick_grew_up, {
        name: user.name,
        id: id,
        value: resize,
        new_value: user.size,
        current_position: current_position,
      }),
      { parse_mode: "markdown" }
    );
  } else if (resize < 0) {
    ctx.reply(
      Mustache.render(locale.dick_shruck, {
        name: user.name,
        id: id,
        value: -resize,
        new_value: user.size,
        current_position: current_position,
      }),
      { parse_mode: "markdown" }
    );
  } else {
    throw new Error("Size must not equal 0");
  }
}
