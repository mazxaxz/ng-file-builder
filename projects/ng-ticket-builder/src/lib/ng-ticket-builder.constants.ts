import { DefaultBlocks } from "./ng-ticket-builder.models";

export const PAGE_SIZES = {
  A7: { width: 210, height: 298, scale: 2.02 },
  A6: { width: 298, height: 420, scale: 1.42 },
  A5: { width: 420, height: 595, scale: 1 },
  A4: { width: 595, height: 842, scale: 0.7 }
}

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
  }
}