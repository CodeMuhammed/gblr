# Translator module

This module provides developers with the ability to manage translations in angular applications.

##  How to use
* `npm i @anchorsolutions/translator --save`.

## Importing into an existing app

in `app.module.ts`

```
import { TranslateModule } from '@anchorsolutions/translator';

imports: [
   ...,
   TranslateModule.forRoot(FireStoreService)
],
```

