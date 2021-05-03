import {
    Directive,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
} from "@angular/core";
import { AwesomeQR } from "awesome-qr";

@Directive({
    selector: "img[rmsQrCode]",
})
export class QrCodeDirective implements OnChanges, OnInit {
    @Input("rmsQrCode")
    link: string;

    @Input()
    size = 128;

    @HostBinding("src")
    dataUrl: string;

    ngOnInit() {
        this.generateQrCode();
    }

    ngOnChanges() {
        this.generateQrCode();
    }

    private generateQrCode() {
        if (this.link == null) {
            return;
        }
        new AwesomeQR({
            text: this.link,
            size: this.size,
            components: {
                data: {
                    scale: 1
                }
            }
        })
            .draw()
            .then((dataUrl) => (this.dataUrl = dataUrl as string));
    }
}
