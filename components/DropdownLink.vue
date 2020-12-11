<template>
    <div class="dropdown-wrapper">
        <!-- Dropdown Trigger -->
        <a
            href="javascript:void(0);"
            class="waves-block waves-effect waves-light dropdown-trigger"
            :data-target="`dropdown-${index || item.text}`"
        >
            <span>{{ item.text }}</span>
            <i class="material-icons right">arrow_drop_down</i>
        </a>
        <!-- NavLink List -->
        <ul :id="`dropdown-${index || item.text}`" class="dropdown-content">
            <li v-for="(t, i) in item.items" :key="i">
                <NavLink :item="t" />
            </li>
        </ul>
    </div>
</template>

<script>
import NavLink from "@theme/components/NavLink";

export default {
    components: { NavLink },
    props: {
        index: Number,
        item: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
