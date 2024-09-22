export class SpriteSheet {
    private readonly _sprites: ImageBitmap[];

    constructor(sprites: ImageBitmap[]) {
        this._sprites = sprites;
    }

    static async create(
        source: string,
        spriteWidth: number = 16,
        spriteHeight: number = 16,
        spriteSpacing: number = 1
    ): Promise<SpriteSheet> {
        return new Promise<ImageBitmap>((resolve, reject) => {
            let img = new Image();

            img.onload = () => {
                createImageBitmap(img).then(bitmap => {
                    resolve(bitmap);
                });
            };
            img.onerror = () => {
                reject(new Error(`Failed to load image '${source}'.`));
            };
            img.src = source;
        }).then(bitmap => {
            return this._splitSprites(bitmap, spriteWidth, spriteHeight, spriteSpacing);
        }).then(sprites => {
            return new SpriteSheet(sprites);
        });
    }

    private static async _splitSprites(
        image: ImageBitmap,
        spriteWidth: number = 16,
        spriteHeight: number = 16,
        spriteSpacing: number = 1
    ): Promise<ImageBitmap[]> {
        let sprites: ImageBitmap[] = []
        let index = 0;
        let cursorX: number = 0;
        let cursorY: number = 0;

        return new Promise<ImageBitmap[]>((resolve) => {
            while ((cursorY + spriteHeight) <= image.height) {
                while ((cursorX + spriteWidth) <= image.width) {
                    createImageBitmap(image, cursorX, cursorY, spriteWidth, spriteHeight).then(bmp => {
                        sprites.push(bmp);
                    });
                    index++;
                    cursorX += spriteSpacing + spriteWidth;
                }
                cursorX = 0;
                cursorY += spriteSpacing + spriteHeight;
            }
            resolve(sprites);
        })
    }

    getByIndex(index: number): ImageBitmap {
        return this._sprites[index]
    }

    // noinspection JSUnusedGlobalSymbols
    get length(): number {
        return this._sprites.length;
    }
}
