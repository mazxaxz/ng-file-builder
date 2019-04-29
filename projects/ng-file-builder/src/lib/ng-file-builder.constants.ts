import { DefaultBlocks } from "./ng-file-builder.models";

export const PAGE_SIZES = {
  "72ppi": {
    A7: { width: 210, height: 298, scale: 2.02 },
    A6: { width: 298, height: 420, scale: 1.42 },
    A5: { width: 420, height: 595, scale: 1 },
    A4: { width: 595, height: 842, scale: 0.7 }
  },
  "96ppi": {
    A7: { width: 280, height: 397, scale: 1.515 },
    A6: { width: 397, height: 559, scale: 1.065 },
    A5: { width: 559, height: 794, scale: 0.75 },
    A4: { width: 794, height: 1123, scale: 0.524 }
  },
  "150ppi": {
    A7: { width: 437, height: 620, scale: 0.97 },
    A6: { width: 620, height: 874, scale: 0.682 },
    A5: { width: 874, height: 1240, scale: 0.479 },
    A4: { width: 1240, height: 1754, scale: 0.3355 }
  }
}

export const WEBSAFE_FONTS = ['Arial', '"Arial Black"', 'Georgia', '"Times New Roman"',
  '"Comic Sans MS"', 'Impact', 'Tahoma', 'Verdana', '"Courier New"', '"Lucida Console"'];

export const FONT_WEIGHTS = {
  '100': 'Lightest',
  '200': 'Lighter',
  '300': 'Light',
  '400': 'Normal',
  '500': 'Bold Normal',
  '600': 'Bolder Normal',
  '700': 'Bold',
  '800': 'Bolder',
  '900': 'Boldest'
}

export const AVAILABLE_TEXTURES = [
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/always_grey.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/arches.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/az_subtle.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/black_thread.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/black_mamba.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/black_lozenge.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/cartographer.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/checkered_pattern.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/climpek.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/corrugation.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/cubes.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/crosses.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/crissXcross.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/diagonal_striped_brick.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/diagmonds.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/escheresque.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/escheresque_ste.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/flowers.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/graphy.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/polonez_car.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/pyramid.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/soft_circle_scales.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/struckaxiom.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/tasky_pattern.png',
  'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/woven.png'
];

export const QR_CODE_SRC_PLACEHOLDER = '/assets/images/qr_code_image_placeholder.png';

export const DEFAULT_BLOCKS_HTML = {
  qrcode: {
    selector: 'div',
    attributes: [],
    enumDecorator: DefaultBlocks.QrCode,
    icon: 'gradient',
    label: 'QR Code',
    initialText: null,
    initialStyles: [
      {
        name: 'height',
        value: '200px'
      },
      {
        name: 'width',
        value: '200px'
      },
      {
        name: 'background-image',
        value: `url('${QR_CODE_SRC_PLACEHOLDER}')`
      },
      {
        name: 'background-size',
        value: 'contain'
      },
      {
        name: 'background-repeat',
        value: 'no-repeat'
      }
    ]
  },
  square: {
    selector: 'div',
    attributes: [],
    enumDecorator: DefaultBlocks.Square,
    icon: 'stop',
    label: 'Square',
    initialText: null,
    initialStyles: [
      {
        name: 'height',
        value: '100px'
      },
      {
        name: 'width',
        value: '100px'
      },
      {
        name: 'background-color',
        value: '#504280'
      }
    ]
  },
  header: {
    selector: 'h1',
    attributes: [],
    enumDecorator: DefaultBlocks.Header,
    icon: 'title',
    label: 'Header',
    initialText: 'Header',
    initialStyles: [
      {
        name: 'font-size',
        value: '24px'
      },
      {
        name: 'font-weight',
        value: '700'
      },
      {
        name: 'font-family',
        value: "'Arial', sans-serif"
      }
    ]
  },
  paragraph: {
    selector: 'p',
    attributes: [],
    enumDecorator: DefaultBlocks.Paragraph,
    icon: 'text_fields',
    label: 'Paragraph',
    initialText: 'Paragraph',
    initialStyles: [
      {
        name: 'font-size',
        value: '14px'
      },
      {
        name: 'font-weight',
        value: '400'
      },
      {
        name: 'font-family',
        value: "'Arial', sans-serif"
      }
    ]
  },
  image: {
    selector: 'img',
    attributes: [
      {
        name: 'src',
        value: ''
      }
    ],
    enumDecorator: DefaultBlocks.Image,
    icon: 'landscape',
    label: 'Image',
    initialText: null,
    initialStyles: []
  }
}