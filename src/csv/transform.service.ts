import { Injectable } from '@nestjs/common';

const mapper = {
  productId: { index: 'ProductID' },
  PKG: { index: 'PKG' },
  name: { index: 'ProductName' },
  type: { index: 'Type' },
  shortDescription: { index: 'ProductShortDescription' },
  description: { index: 'ProductDescription' },
  vendorId: { index: 'VendorId' },
  manufacturerId: { index: 'ManufacturerID' },
  manufacturerName: { index: 'ManufacturerName' },
  storefrontPriceVisibility: { index: 'StoreFrontPriceVisibility' },
  variants: {
    id: { index: 'ItemID' },
    available: { index: 'Availability' },
    attributes: { index: 'Attributes' },
    cost: { index: 'UnitCost' },
    currency: { index: 'PriceDescription' },
    depth: { index: 'UnitDepth' },
    description: { index: 'ItemDescription' },
    dimensionUOM: { index: 'DimensionUOM' },
    height: { index: 'UnitHeight' },
    width: { index: 'UnitWidth' },
    manufacturerItemCode: { index: 'ManufacturerItemCode' },
    manufacturerItemId: { index: 'ManufacturerID' },
    packaging: { index: 'Packing' },
    price: { index: 'UnitPrice' },
    quantity: { index: 'Quantity' },
    volume: { index: 'UnitVolume' },
    volumeUOM: { index: 'VolumeUOM' },
    weight: { index: 'UnitWeight' },
    weightUOM: { index: 'WeightUOM' },
    optionName: { index: 'OptionName' },
    optionsPath: { index: 'OptionsPath' },
    optionItemsPath: { index: 'OptionItemsPath' },
    sku: { index: 'SKU' },
  },
  options: {
    id: { index: 'OptionID' },
    name: { index: 'OptionName' },
    dataField: { index: 'DataField' },
    values: {
      id: { index: 'OptionValueID' },
      name: { index: 'OptionValueName' },
      value: { index: 'OptionValue' },
    },
  },
  isAvailable: { index: 'IsAvailable' },
  isFragile: { index: 'IsFragile' },
  storefrontPublished: { index: 'StorefrontPublished' },
  isTaxable: { index: '' },
  image: {
    url: { index: 'ItemImageURL' },
  },
  categoryId: { index: 'CategoryPathID' },
};
// todo: continue adding index: {} to the matter and use it

@Injectable()
export class TransformService {
  transform(csvExtractedArray) {
    const header = csvExtractedArray.shift();
    // Skip if not unique ProductID + ItemID + PKG --> unique
    // Products with the same ProductID are part of the same variant

    // todo: do not use individual row attribtuion. Use the mapper{}
    const result = [];
    csvExtractedArray.map((row) => {
      const found = result.find((item) => {
        return (
          item.id ===
          row[header.indexOf(mapper.productId.index)] +
            row[header.indexOf(mapper.variants.id.index)] +
            row[header.indexOf(mapper.PKG.index)]
        );
      });
      if (!found) {
        const productFound = result.find((item) => {
          return item.productId === row[header.indexOf(mapper.productId.index)];
        });
        if (!productFound) {
          result.push({
            id:
              row[header.indexOf(mapper.productId.index)] +
              row[header.indexOf(mapper.variants.id.index)] +
              row[header.indexOf(mapper.PKG.index)],
            productId: row[header.indexOf(mapper.productId.index)],
            name: row[header.indexOf(mapper.name.index)],
            type: row[header.indexOf(mapper.type.index)],
            shortDescription:
              row[header.indexOf(mapper.shortDescription.index)],
            description: row[header.indexOf(mapper.description.index)],
            vendorId: row[header.indexOf(mapper.vendorId.index)],
            manufacturerId: row[header.indexOf(mapper.manufacturerId.index)],
            storefrontPriceVisibility:
              row[header.indexOf(mapper.storefrontPriceVisibility.index)],
            variants: [],
            options: [],
            isAvailable: row[header.indexOf(mapper.isAvailable.index)],
            isFragile: row[header.indexOf(mapper.isFragile.index)],
            storefrontPublished:
              row[header.indexOf(mapper.storefrontPublished.index)],
            isTaxable: row[header.indexOf(mapper.isTaxable.index)],
            image: [],
            categoryId: row[header.indexOf(mapper.categoryId.index)],
          });
        }
        const foundItem = result.find((item) => {
          return item.productId === row[header.indexOf(mapper.productId.index)];
        });
        if (foundItem) {
          if (row[header.indexOf(mapper.image.url.index)].includes('http'))
            foundItem.image.push({
              url: row[header.indexOf(mapper.image.url.index)],
            });
          foundItem.variants.push({
            id: row[header.indexOf(mapper.variants.id.index)],
            available: row[header.indexOf(mapper.variants.available.index)],
            attributes: row[header.indexOf(mapper.variants.attributes.index)],
            cost: row[header.indexOf(mapper.variants.cost.index)],
            currency: row[header.indexOf(mapper.variants.currency.index)],
            depth: row[header.indexOf(mapper.variants.depth.index)],
            description: row[header.indexOf(mapper.variants.description.index)],
            dimensionUOM:
              row[header.indexOf(mapper.variants.dimensionUOM.index)],
            height: row[header.indexOf(mapper.variants.height.index)],
            width: row[header.indexOf(mapper.variants.width.index)],
            manufacturerItemCode:
              row[header.indexOf(mapper.variants.manufacturerItemCode.index)],
            manufacturerItemId:
              row[header.indexOf(mapper.variants.manufacturerItemId.index)],
            packaging: row[header.indexOf(mapper.variants.packaging.index)],
            price: row[header.indexOf(mapper.variants.price.index)],
            quantity: row[header.indexOf(mapper.variants.quantity.index)],
            volume: row[header.indexOf(mapper.variants.volume.index)],
            volumeUOM: row[header.indexOf(mapper.variants.volumeUOM.index)],
            weight: row[header.indexOf(mapper.variants.weight.index)],
            weightUOM: row[header.indexOf(mapper.variants.weightUOM.index)],
            optionName: row[header.indexOf(mapper.variants.optionName.index)],
            optionsPath: row[header.indexOf(mapper.variants.optionsPath.index)],
            optionItemsPath:
              row[header.indexOf(mapper.variants.optionItemsPath.index)],
            sku: row[header.indexOf(mapper.variants.sku.index)],
          });
          foundItem.options.push({
            id: row[header.indexOf(mapper.options.id.index)],
            name: row[header.indexOf(mapper.options.name.index)],
            dataField: row[header.indexOf(mapper.options.dataField.index)],
            values: [
              {
                id: row[header.indexOf(mapper.options.values.id.index)],
                name: row[header.indexOf(mapper.options.values.name.index)],
                value: row[header.indexOf(mapper.options.values.value.index)],
              },
            ],
          });
        }
      }
    });
    result.map((item) => {
      delete item.id;
      delete item.productId;
    });
    return result;
  }
}
