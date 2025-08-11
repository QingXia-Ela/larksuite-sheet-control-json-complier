interface IEventHandler {
    "eventParams"?: {
        "stopPropagation": boolean;// 是否阻止冒泡，默认 false
    }
    "action"?: string
    "params"?: any
}

interface ViewProps {
    style?: {
        flexDirection?: 'row' | 'column',
        justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
        alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
        backgroundColor?: string; 
    } & CSS.Properties;
    onClick?: IEventHandler; // 事件绑定
    onDoubleClick?: IEventHandler; // 事件绑定
}

interface TextProps {
    style?: {
        color?: string;
        fontSize?: number;
        fontWeight?: number;
    };
    content: string | number;
    onClick?: IEventHandler; // 事件绑定
    onDoubleClick?: IEventHandler; // 事件绑定
}

interface ImageProps {
    src: string; // 支持 png、jpeg、svg，不支持 gif
    onClick?: IEventHandler; // 事件绑定
    onDoubleClick?: IEventHandler; // 事件绑定
}

function View(props: React.PropsWithChildren<ViewProps>): React.ReactNode;
function Text(props: React.PropsWithChildren<TextProps>): React.ReactNode;
function Image(props: React.PropsWithChildren<ImageProps>): React.ReactNode;

interface UISchema {
    $schema: '1.0.0'; // 协议版本
    definitions?: { // 全局定义申明
        // 自定义色值，key 
        $colorTokens?: Record<string, {
           lignt_mode: string; // rgba(1, 2, 3, 1)
           dark_mode: string; // rgba(3, 2, 1, 1)
        }>;
        // 多语言词条
        $i18n?: Record<string, {
            zh_CN: string;
            en_US: string;
            ja_JP: string;
        }>;
        // 自定义变量
        data?: Record<string, {
            type: 'string' | 'number'; // 现默认为 string
            name: string; // 变量名称
            mock_value: any; // 模拟值，用于调试 mock 展示
        }>;
    };
    template: {
        type: "view" | "text" | "image";
        props: {
            style?: Partial<CSS.Properties>;
            hidden?: boolean;
            onClick?: IEventHandler;
        };
        children?: [];
    };
}

type PickDefs<T = string> = Exclude<Exclude<UISchema['definitions'], undefined>[T], undefined>

type ColorTokensType = PickDefs<'$colorTokens'>
type I18nType = PickDefs<'$i18n'>
type DataType = PickDefs<'data'>

declare const $container: {
    width: number
    height: number
}