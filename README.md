## Review

You didn't follow requirments
  variants: {} is an array in the model. 


Use Object.keys and set each value, no need to set them individually.
```
name: row[header.indexOf(mapper.name.index)],
type: row[header.indexOf(mapper.type.index)],
```

You load all the file at once. Bad idea

You iterate the products[] every time to find if the produce exists. Why not just add the unique ids to an object and use if?

No comments on any function or method


Why import the entire object when you can import only the functions you need
```
// BAD:
import * as events from 'events';
// GOOD:
import { createReadStream } from 'fs';
````
