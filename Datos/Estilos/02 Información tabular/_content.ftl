<#list features as feature>
        <ul>
        <#list feature.attributes as attribute>
                <#if !attribute.isGeometry>
                        <li>${attribute.name}: ${attribute.value}</li>
                </#if>
        </#list>
        </ul>
</#list>