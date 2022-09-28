declare namespace JSX {
    import type { PassageElement, PassageProfileElement } from '@passageidentity/passage-elements'
    interface IntrinsicElements {
        "passage-auth": PassageElement;
        "passage-login": PassageElement;
        "passage-register": PassageElement;
        "passage-profile": PassageProfileElement;
    }
}