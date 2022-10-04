import { Injectable } from '@nestjs/common';


const mapper = {
  manufacturerId: { index: 'ManufacturerID'},
  name: { index: 'ProductName'},
  // todo: continue adding index: {} to the matter and use it

}



@Injectable()
export class TransformService {
  transform(csvExtractedArray) {
    csvExtractedArray.shift();
    // Skip if not unique ProductID + ItemID + PKG --> unique
    // Products with the same ProductID are part of the same variant


    // todo: do not use individual row attribtuion. Use the mapper{} 
    const result = [];
    csvExtractedArray.map((row) => {
      const itemId = row[0],
        manufacturerId = row[1],
        productName = row[5],
        productId = row[4],
        manufacturerItemCode = row[7],
        productDescription = row[8],
        itemDescription = row[17],
        itemImageURL = row[9],
        PKG = row[10],
        unitPrice = row[12],
        priceDescription = row[11],
        availability = row[15];

      const found = result.find((item) => {
        return item.id === itemId + productId + PKG;
      });
      if (!found) {
        const productFound = result.find((item) => {
          return item.productId === productId;
        });
        if (!productFound) {
          result.push({
            id: itemId + productId + PKG,
            productId,
            name: productName,
            type: '',
            shortDescription: '',
            description: productDescription,
            vendorId: '',
            manufacturerId,
            storefrontPriceVisibility: 'members-only',
            variants: [],
            options: [],
            isAvailable: true,
            isFragile: false,
            storefrontPublished: false,
            isTaxable: true,
            image: [],
            categoryId: null,
          });
        }
        const foundItem = result.find((item) => {
          return item.productId === productId;
        });
        if (foundItem) {
          if (itemImageURL.includes('http'))
            foundItem.image.push({ url: itemImageURL });
          foundItem.variants.push({
            id: itemId,
            available: availability,
            attributes: {},
            cost: 0,
            currency: priceDescription,
            depth: '',
            description: itemDescription,
            dimensionUOM: '',
            height: '',
            width: '',
            manufacturerItemCode,
            manufacturerItemId: null,
            packaging: null,
            price: unitPrice,
            quantity: null,
            volume: '',
            volumeUOM: '',
            weight: '',
            weightUOM: '',
            optionName: '',
            optionsPath: '',
            optionItemsPath: '',
            sku: null,
          });
          /* foundItem.options.push({
            id: '',
            name: '',
            dataField: null,
            values: [
              {
                id: '',
                name: '',
                value: '',
              },
            ],
          }); */
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
