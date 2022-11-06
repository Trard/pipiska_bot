import { get_user, update_last_grew_up, get_position } from "../db.js";
import { locale } from "../index.js";
import Mustache from "mustache";

const day = 60 * 60 * 24;

export default function (ctx, next) {
  let id = ctx.message.from.id;

  let now = ctx.message.date;
  let user = get_user(id, ctx.chat.id);

  if (now - user.last_grew_up > day) {
    //in seconds
    update_last_grew_up(id, ctx.chat.id, now);
    next();
  } else {
    ctx.reply(
      Mustache.render(locale.not_resize_time, {
        name: user.name,
        id: id,
        value: user.size,
        current_position: get_position(id, ctx.chat.id),
      }),
      { parse_mode: "markdown" }
    );
  }
}
