<div align="center">
  <h1>
    <br/>
    <br/>
    	🛠
    <br />
    @evatrium/utils
    <br />
    <br />
  </h1>
	<br />
	Lightweight typescript utilities
  <sup>
    <br />
    <br />
    <br />
    <a href="https://www.npmjs.com/package/@evatrium/utils">
       <img src="https://img.shields.io/npm/v/@evatrium/utils.svg" alt="npm package" />
    </a>
		<a href="https://github.com/evatrium/utils/actions">
			<img src="https://github.com/evatrium/utils/actions/workflows/npm-publish.yml/badge.svg" alt="build" />
		</a>
  </sup>
  <br />
  <br />

  <pre>npm install @evatrium/utils</pre>
  <br />
</div>


#### Usage
```typescript
import { capitalize, debounce, deepMerge } from '@evatrium/utils';
```

#### Exports

- (casing):
  - **capitalize**: 
    - foo bar => Foo bar
  - **deKabab**: 
    - foo-bar => foo bar
  - **sentenceCase**:
    - foo bar => Foo Bar
  - **deSnake**: 
    - foo_bar => foo bar
  - **snakeToSentenceCase**
    - foo_bar => Foo Bar
- **cn**:
  - conditional classname string builder
- **combineArraysAndDeduplicate**:
  - combines two simple or nested object arrays
  - deduplicates items with *matchBy* option
- **createLocalStore**:
  - creates local storage wrapper that auto parses and stringifies values
  - includes method for debouncing setItem
  - includes method for subscribing to storage event
- **createSubscription**:
	- creates a pub sub 
- **debounce**:
  - wraps provided function in a debounce
- **deepCopy**:
	- deep copies nested objects and arrays
  - intended for serializable data for state trees and json
  - will handle additional types like date objects, maps and sets
- **deepMerge**:
  - deep merges nested objects and arrays
  - intended for serializable data for state trees and json
  - handles additional types like date objects, maps and sets
- **endpoint**:
	- experimental rest endpoint syntax 
- **eventListener**:
	- wrapper for event listener that returns a function to unlisten
- **excludeItemsFromArray**:
	- excludes items from simple and nested object arrays
  - customize equivalence with *matchBy* option
- **findInArray**:
  - internal helper paired with *matchBy*
- (getInSetIn):
  - **getIn**:
    - 'dot.walk' to retrieve a value from a nested object or array
  - **setIn**:
    - 'dot.walk' to set a value in a nested object or array
- **getItemsThatExistInBothArrays**:
  - get the intersection of two arrays
  - customize equivalence with *matchBy* option
- **getMatchBy**:
  - internal helper that accepts options for returning equivalence comparison func
- **getParams**:
  - retrieve location.search params as an object
- **getTotalOfPropInObjArr**:
	- aggregate the total number value on a property on each item in an object array 
- **groupObjArrByProp**:
  - groups/categorizes items in an object array based on a provided prop name
- **hasKeys**:
  - checks if an object is empty
- **includesAll**:
  - checks if arr1 includes all items from arr2
  - customize equivalence with *matchBy* option
- **isEmpty**:
	- checks if an array or object is empty
  - checks if maps and set size are 0
  - otherwise: falsyValue ? true : false
- **isEqual**:
	- checks if two nested objects or arrays are equal
  - handles primitives (JSON-like data) in addition to date objects
- (isType):
  - **isObjectType**: 
    - typeof === 'object': 
  - **isObject**: 
    - typeof === 'object'
    - and not null
  - **isObj**: 
    - typeof === 'object'
    - not null
    - not Array 
    - constructor is Object (aka plain object "{ }")
  - **isObjOrArr**
    - isArray && isObj
  - **isBigInt**
  - **isBool**
  - **isDateObject**
  - **isFunc**
  - **isMap**
  - **isNullOrUndefined**
  - **isNum**
  - **isPrimitive**
  - **isPromise**
  - **isRegExp**
  - **isSet**
  - **isString**
- **isWeb**: 
  - checks if window is defined
- **jsonParse**:
  - safely parses stringified json => { data, error }
- **memoize**:
	- memorizes the result of a function
  - returns cached result if arguments are the same 
- **pluck**:
  - pluck values from an object
- **propsChanged**:
  - fast shallow object key compare
- **shallowEqual**:
  - shallow compare two values
- **signature**:
  - fast stringify / hash-like
- **toggleSelection**:
  - adds item to list if it does not exist
  - removes item from list if it exists
  - customize equivalence with *matchBy* option
- **stringifyParams**:
  - convert a plain object into a url-safe query params string
- **tryCatch**:
	- wraps an async func in a try catch
  - returns { data, error }
- **updateMany**:
	- update multiple items in an object array
	- customize equivalence with *matchBy* option
- **url**:
  - url\`foo/bar?${id:1,hey:'yo'}` => 'foo?id=1&hey=yo'
- **wait**:
  - pause execution inside the body of an async func
  - await wait(100); 


		
### License
[MIT](https://choosealicense.com/licenses/mit/)
