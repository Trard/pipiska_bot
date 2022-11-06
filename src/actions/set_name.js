export default function(ctx, next) {
    let author = ctx.message.from;

    let name = author.first_name;
    
    if (author.last_name) {
        name += ` ${author.last_name}`;
    }
    
    ctx.message.from.name = name;

    next()
}
