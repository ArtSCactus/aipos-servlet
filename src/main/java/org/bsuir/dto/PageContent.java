package org.bsuir.dto;

import java.util.*;

public class PageContent {
    private Map<Object, Object> attributes;

    public PageContent() {
        attributes = new HashMap<>();
    }



    public void setAttribute(Object key, Object value){
        attributes.put(key, value);
    }

    public void removeAttribute(Object key){
        attributes.remove(key);
    }

    public Map<Object, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<Object, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PageContent)) return false;
        PageContent that = (PageContent) o;
        return Objects.equals(getAttributes(), that.getAttributes());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAttributes());
    }

    @Override
    public String toString() {
        return "PageContent{" +
                "attributes=" + attributes +
                '}';
    }
}
