import { Transform as TransformStream, TransformCallback } from 'stream';

/**
 * Transform stream that converts native messaging bytes into JavaScript objects.
 *
 * Reads 4-byte length prefix, then the JSON message bytes.
 */
export class Input extends TransformStream {
    constructor();
    _transform(chunk: Buffer, encoding: string, callback: TransformCallback): void;
}

/**
 * Transform stream that converts JavaScript objects into native messaging bytes.
 *
 * Writes 4-byte length prefix, then the JSON message bytes.
 */
export class Output extends TransformStream {
    constructor();
    _transform(chunk: unknown, encoding: string, callback: TransformCallback): void;
}

/**
 * Transform stream that transforms message objects into reply objects using a handler.
 *
 * @param handler - Function that processes each message and calls callback with reply
 */
export class Transform extends TransformStream {
    constructor(handler: (msg: unknown, push: (data: unknown) => void, done: (err?: Error) => void) => void);
    _transform(msg: unknown, encoding: string, callback: TransformCallback): void;
}

/**
 * Transform stream that converts JavaScript objects into lines of JSON for debugging.
 */
export class Debug extends TransformStream {
    constructor();
    _transform(chunk: unknown, encoding: string, callback: TransformCallback): void;
}
