export const updatePricingsByBandWidth = (entity) => {

  let pricings = entity.pricings;

  switch (entity.band_width) {
    case '1 inch':
      pricings.push({
          operator: '*', 
          operand: 1.8,
          note: 'band_size=' + entity.band_size
        });
      break;
    case '1/4 inch':
      pricings.push({
          operator: '*', 
          operand: 0.85,
          note: 'band_size=' + entity.band_size
        });
      break;
    default:
      pricings.push({
          operator: '*', 
          operand: 1,
          note: 'band_size=' + entity.band_size
        });    
      break;
  };
  return Object.assign({}, entity, {pricings: pricings});
};
