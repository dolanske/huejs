import { h } from '../render.js'
import { useRouter } from './router.ts'

export default {
  render({ name, text, props }) {
    const router = useRouter()
    const to = router.getRoute({ by: 'name', value: name })

    const pushRoute = (e) => {
      e.preventDefault()
      router.push(to)
    }

    return h(
      'a',
      {
        href: to.path,
        onClick: (e) => pushRoute(e),
        class: [
          router.activeRoute.value.name === to.name ? 'route-active' : '',
          'router-link',
        ],
      },
      text
    )
  },
}
