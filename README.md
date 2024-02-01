<h1 align="center">
GSM Arena Phone Info API
</h1>
<p align="center">
This is an unofficial GSM Arena API that provides smartphone information like processor type, camera modules, battery, etc.
</p>

## Installation

### Local

Run this command to install the api locally

```sh
$ git clone https://github.com/raffyamoguis/gsm-arena-api.git
$ cd gsm-arena-api
$ npm install #or yarn install
```

Edit .env file

```env
GSM_ARENA_URL=https://www.gsmarena.com
```

Start the server

```sh
npm start
```

### Vercel

Host this api on vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fraffyamoguis%2Fgsm-arena-api)

## Endpoint

### Search

**GET** /gsm/search?q={query}

```json
[
  {
    "id": "xiaomi_poco_x3_pro-10802.php",
    "name": "Xiaomi Poco X3 Pro",
    "image": "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x3-pro-.jpg"
  },
  {
    "id": "xiaomi_poco_x3_nfc-10415.php",
    "name": "Xiaomi Poco X3 NFC",
    "image": "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x3-nfc.jpg"
  },
  {
    "id": "xiaomi_poco_x3-10461.php",
    "name": "Xiaomi Poco X3",
    "image": "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x3.jpg"
  },
  {
    "id": "xiaomi_poco_x3_gt-10949.php",
    "name": "Xiaomi Poco X3 GT",
    "image": "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-10-pro-china-new.jpg"
  }
]
```

### Phone Info

**GET** /gsm/info/:id

```json
{
    "name": "Xiaomi Poco X3 Pro",
    "network": "GSM / HSPA / LTE",
    "launced": {
        "announced": "2021, March 22",
        "status": "Available. Released 2021, March 24"
    },
    "body": {
        "dimension": "165.3 x 76.8 x 9.4 mm (6.51 x 3.02 x 0.37 in)",
        "weight": "215 g (7.58 oz)",
        "sim": "Hybrid Dual SIM (Nano-SIM, dual stand-by)",
        "other": "IP53, dust and splash resistant"
    },
    "display": {
        "type": "IPS LCD, 120Hz, HDR10, 450 nits (typ)",
        "size": "6.67 inches, 107.4 cm2 (~84.6% screen-to-body ratio)",
        "resolution": "1080 x 2400 pixels, 20:9 ratio (~395 ppi density)",
        "protection": "Corning Gorilla Glass 6",
        "displayOther": ""
    },
    ...
}
```

### Phone Images

**GET** /gsm/images/:id

```json
{
    "id": "xiaomi_poco_x3_pro-pictures-10802.php",
    "images": [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x3-pro-1.jpg",
        "https://fdn.gsmarena.com/imgroot/reviews/21/poco-x3-pro/lifestyle/-1024w2/gsmarena_001.jpg",
        "https://fdn.gsmarena.com/imgroot/reviews/21/poco-x3-pro/lifestyle/-1024w2/gsmarena_002.jpg",
        "https://fdn.gsmarena.com/imgroot/reviews/21/poco-x3-pro/lifestyle/-1024w2/gsmarena_003.jpg"
    ],
}
```

## Development

### More endpoint are being developed feel free to create a request for contribution.
