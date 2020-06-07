import { Pipe, PipeTransform } from '@angular/core';
import { PROVIDERS, ProviderStyle } from '../providers';

@Pipe({
    name: 'provider',
})
export class ProviderPipe implements PipeTransform {
    transform(name: string): ProviderStyle {
        return PROVIDERS[name];
    }
}
