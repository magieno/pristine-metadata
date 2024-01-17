# pristine-metadata

This library extends Reflect-Metadata with methods that make it easier to manipulate metadata without knowing all the conventions.

# Classes

With the class:

```
class MyClass {
    title: string
}

ClassMetadata.defineMetadata(MyClass, "title", "keyname", "value");
ClassMetadata.getMetadata(MyClass, "title", "keyname");
```

With the object:

```
class MyClass {
    title: string
}

const myClass = new Class();

ClassMetadata.defineMetadata(myClass.constructor, "title", "keyname", "value");
ClassMetadata.getMetadata(myClass.constructor, "title", "keyname");
```
# Properties

With the class:

```
class MyClass {
    title: string
}

PropertyMetadata.defineMetadata(MyClass.prototype, "title", "keyname", "value");
PropertyMetadata.getMetadata(MyClass.prototype, "title", "keyname");
```

With the object:

```
class MyClass {
    title: string
}

const myClass = new Class();

PropertyMetadata.defineMetadata(myClass, "title", "keyname", "value");
PropertyMetadata.getMetadata(myClass, "title", "keyname");
```