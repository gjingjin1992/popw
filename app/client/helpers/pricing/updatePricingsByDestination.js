export const updatePricingsByDestination = (entity, destination) => {

  let pricings = entity.pricings;

  switch (destination) {
    case 'Europe & UK':
      pricings.push({
          operator: '+', 
          operand: 5 * entity.quantity,
          note: 'destination=' + destination
        });
      break;
    case 'South America':
      pricings.push({
          operator: '+', 
          operand: 10 * entity.quantity,
          note: 'destination=' + destination
        });
      break;
    case 'Australia':
      pricings.push({
          operator: '+', 
          operand: 5 * entity.quantity,
          note: 'destination=' + destination
        });
      break;
    default:
      pricings.push({
          operator: '+', 
          operand: 0,
          note: 'destination=' + destination
        });    
      break;
  }
  ;
  return Object.assign({}, entity, {pricings: pricings});
};