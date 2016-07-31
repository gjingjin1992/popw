export const updatePricingsByCategory = (entity, category, rules) => {
  console.log('pricings', entity);
  let pricings = entity.pricings;

  rules.map((rule) => {
    if (
      rule.category === category
      && entity.quantity >= rule.start
      && entity.quantity <= rule.end
    ) {

      const price_print = rule.print > 100 ? rule.print : rule.print * entity.quantity;
      const price_debossed = rule.debossed > 100 ? rule.debossed : rule.debossed * entity.quantity;
      const price_debossed_with_colour = rule.debossed_with_colour > 100 ? rule.debossed_with_colour : rule.debossed_with_colour * entity.quantity;
      const price_embossed = rule.embossed > 100 ? rule.embossed : rule.embossed * entity.quantity;
      const price_embossed_with_colour = rule.embossed_with_colour > 100 ? rule.embossed_with_colour : rule.embossed_with_colour * entity.quantity;

      let note = category + '_' + rule.start.toString() + '-' + rule.end.toString()
      switch (entity.text_style) {
        case 'print':
          pricings.push({
              operator: '+', 
              operand: price_print,
              note: 'price_rule=' + note + '_' + entity.text_style 
            });
          break;
        case 'debossed':
          pricings.push({
              operator: '+', 
              operand: parseInt(price_debossed, 10),
              note: 'price_rule=' + note + '_' + entity.text_style 
          });
          break;            
        case 'debossed_with_text_colour':
          pricings.push({
              operator: '+', 
              operand: parseInt(price_debossed_with_colour, 10),
              note: 'price_rule=' + note + '_' + entity.text_style 
          });
          break;
        case 'embossed':
          pricings.push({
              operator: '+', 
              operand: parseInt(price_embossed, 10),
              note: 'price_rule=' + note + '_' + entity.text_style 
            });
          break;
        case 'embossed_with_text_colour':
          pricings.push({
              operator: '+', 
              operand: parseInt(price_embossed_with_colour, 10),
              note: 'price_rule=' + note + '_' + entity.text_style 
          }); 
          break;
        default:
          break;
      }
    }
  });

  return Object.assign({}, entity, {pricings: pricings});
};
