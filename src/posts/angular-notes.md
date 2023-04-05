---
title: Angular7 Notes
date: 2019-03-07 14:38:37
tags:
- Javascript
- Angular
categories: Notes
---

## Decorator
`@Component()`

## Binding
- `<h1>{{name}}</h1>`
- `<h1 [textContent]="name"></h1>`
- `<h1 textContent="{{name}}"></h1>`

### Delete Example
_app.component.html_
``` html
<a class="delete" (click)="onDelete()">
    remove
</a>
```

_app.component.ts_
``` ts
import { Component } from '@angular/core';

@Component({
    selector: 'mw-media-item',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/media-item.component.css']
})
export class MediaItemComponent{
    onDelete(){
        console.log('deleted');
    }
}
```

## NGIF
``` html
<div *ngif="mediaItem.watchOn">{{mediaItem.watchOn}}</div>

<!--or-->
<ng-template [ngIf]="mediaItem.watchOn">
    <div>{{mediaItem.watchOn}}</div>
</ng-template>
```

## NGFOR
``` html
<section>
    <mw-media-item
        *ngFor="let mediaItem of mediaItems"
        [mediaItem]="mediaItem"
        (delete)="onMediaItemDelete($event)">
    </mw-media-item>
</section>
```

## NGCLASS
``` html
<section>
    <mw-media-item
        [ngClass]="{'medium-movies': mediaItem.medium==='Movies', 'medium-series': mediaItem.medium==='Serires'}"
        *ngFor="let mediaItem of mediaItems"
        [mediaItem]="mediaItem"
        (delete)="onMediaItemDelete($event)">
    </mw-media-item>
</section>
```

## Animation
- State: `Void`, `Defualt(*)`, `Custom`
    - Add Item: `void => *`, Remove: `* => void`

# Reference
- [Angular](https://angular.io/docs)
- [Angular Essential Training](https://www.lynda.com/Angular-tutorials/Angular-Essential-Training/540347-2.html)