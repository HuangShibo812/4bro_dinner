export const drinkSubOptions = {
  type:      ['紅茶', '奶茶', '綠茶'],
  sweetness: ['正常糖', '半糖', '微糖', '無糖'],
  ice:       ['正常冰', '少冰', '去冰', '溫熱'],
};

const setAChoices = ['薯條 + 糖心蛋 + 飲料', '雞塊 + 糖心蛋 + 飲料'];
const setBOption  = { id: 'set-b', label: '加B套餐', price: 40, type: 'checkbox', hasDrinkSub: true };

export const customizationOptions = {
  rice: [
    { id: 'extra-rice', label: '加飯',    price: 10, type: 'checkbox' },
    { id: 'drink',      label: '加飲料',  price: 20, type: 'checkbox', hasDrinkSub: true },
    { id: 'set-a',      label: '加A套餐', price: 70, type: 'checkbox', setChoices: setAChoices, hasDrinkSub: true },
    setBOption,
  ],
  noodle: [
    { id: 'noodle-type',  label: '麵條種類', price: 0,  type: 'radio',    required: true, choices: ['烏龍麵', '意麵'] },
    { id: 'extra-noodle', label: '加麵',     price: 15, type: 'checkbox' },
    { id: 'drink',        label: '加飲料',   price: 20, type: 'checkbox', hasDrinkSub: true },
    { id: 'milk',         label: '加牛奶',   price: 10, type: 'checkbox' },
    { id: 'cheese',       label: '加起司',   price: 10, type: 'checkbox' },
    { id: 'set-a',        label: '加A套餐',  price: 70, type: 'checkbox', setChoices: setAChoices, hasDrinkSub: true },
    setBOption,
  ],
  side: [],
};
