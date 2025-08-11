type PropsWithChildren<P = unknown> = P & { children?: ReactNode | undefined };

interface ViewProps {
}

interface TextProps {

}

interface ImageProps {

}

function View(props: PropsWithChildren<ViewProps>): React.ReactNode;
function Text(props: PropsWithChildren<TextProps>): React.ReactNode;
function Image(props: PropsWithChildren<ImageProps>): React.ReactNode;

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