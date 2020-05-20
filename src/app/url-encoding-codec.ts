import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RusticUrlEncodingCoded extends HttpUrlEncodingCodec {
    encodeKey(key: string): string {
        if (key.endsWith('[]')) {
            return key;
        }
        return super.encodeKey(key);
    }
}
