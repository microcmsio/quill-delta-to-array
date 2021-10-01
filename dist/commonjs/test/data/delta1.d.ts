declare var delta1: {
  ops: (
    | {
        insert: string;
        attributes: {
          link: string;
          font?: undefined;
          size?: undefined;
          italic?: undefined;
          bold?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          code?: undefined;
        };
      }
    | {
        insert: string;
        attributes?: undefined;
      }
    | {
        attributes: {
          font: string;
          link?: undefined;
          size?: undefined;
          italic?: undefined;
          bold?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          code?: undefined;
        };
        insert: string;
      }
    | {
        attributes: {
          size: string;
          link?: undefined;
          font?: undefined;
          italic?: undefined;
          bold?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          code?: undefined;
        };
        insert: string;
      }
    | {
        attributes: {
          italic: boolean;
          bold: boolean;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          code?: undefined;
        };
        insert: string;
      }
    | {
        attributes: {
          underline: boolean;
          strike: boolean;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          italic?: undefined;
          bold?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          code?: undefined;
        };
        insert: string;
      }
    | {
        attributes: {
          color: string;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          italic?: undefined;
          bold?: undefined;
          underline?: undefined;
          strike?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          code?: undefined;
        };
        insert: string;
      }
    | {
        attributes: {
          background: string;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          italic?: undefined;
          bold?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          script?: undefined;
          list?: undefined;
          code?: undefined;
        };
        insert: string;
      }
    | {
        attributes: {
          script: string;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          italic?: undefined;
          bold?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          list?: undefined;
          code?: undefined;
        };
        insert: string;
      }
    | {
        insert: {
          formula: string;
        };
        attributes?: undefined;
      }
    | {
        insert: string;
        attributes: {
          list: string;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          italic?: undefined;
          bold?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          code?: undefined;
        };
      }
    | {
        insert: string;
        attributes: {
          code: boolean;
          bold: boolean;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
        };
      }
    | {
        attributes: {
          italic: boolean;
          link: string;
          code: boolean;
          font?: undefined;
          size?: undefined;
          bold?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
        };
        insert: string;
      }
  )[];
  html: string;
  json: (
    | {
        type: string;
        value: string;
        attributes: {
          link: string;
          font?: undefined;
          size?: undefined;
          bold?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          link?: undefined;
          font?: undefined;
          size?: undefined;
          bold?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          font: string;
          link?: undefined;
          size?: undefined;
          bold?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          size: string;
          link?: undefined;
          font?: undefined;
          bold?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          bold: boolean;
          italic: boolean;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          underline: boolean;
          strike: boolean;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          bold?: undefined;
          italic?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          color: string;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          bold?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          background: string;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          bold?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          script: string;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          bold?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          list?: undefined;
          indent?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: {
          attributes: {};
          type: string;
          value: string;
        }[];
        attributes: {
          list: string;
          indent: number;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          bold?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          code?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          bold: boolean;
          code: boolean;
          link?: undefined;
          font?: undefined;
          size?: undefined;
          italic?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
        };
      }
    | {
        type: string;
        value: string;
        attributes: {
          italic: boolean;
          code: boolean;
          link: string;
          font?: undefined;
          size?: undefined;
          bold?: undefined;
          underline?: undefined;
          strike?: undefined;
          color?: undefined;
          background?: undefined;
          script?: undefined;
          list?: undefined;
          indent?: undefined;
        };
      }
  )[];
};
export { delta1 };
