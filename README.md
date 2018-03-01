# 自动并按需加载React组件的webpack loader 


#### 它是按需加载的，可以放心使用。
解决第三方ui组件每次使用时都需要 `import xxx from 'xxx'`


#### 使用方式：

在`babel-loader`之前执行。

```js
// webpack.conf.js

...

loader: [
	'babel-loader',
	{
        loader: './build/auto-import-loader',
        options: {
            components: {
                Layout: 'src/auto/lib/layout',
                Button: 'src/auto/lib/button'
            },
            include: [resolve('src/views')],
        }
    }
]

...

```

下方例子中加入了2个组件，`Layout`与`Button`，当页面中使用了该组件，即`<Layout ...`或`<Button ...`，但没有`import`他们时，会自动添加`import`代码。

```jsx

class View extends React.Component {
	render() {
		return (
			<div>
				<Layout.Header />

				<Button>button</Button>
			</div>
		)
	}
}

```

执行完成后会变成

```jsx

import Layout from 'src/auto/lib/layout'
import Button from 'src/auto/lib/button'

class View extends React.Component {
	render() {
		return (
			<div>
				<Layout.Header />

				<Button>button</Button>
			</div>
		)
	}
}

```

它的组件判定条件可以是（理论上常用的组件写法都支持）：
```jsx
<Layout></Layout>


<Layout>
	...
</Layout>


<Layout/>
<Layout />


<Layout.Header>
	...
</Layout.Header>


<Layout.Header />

<Layout.Header
	title={'title'}
/>
```
