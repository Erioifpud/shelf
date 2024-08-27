import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCurrentPage, useCurrentSite } from '../../hooks';
import { useDispatch } from 'react-redux';
import { updateSitePage } from '~store/site/site-slice';
import { Input } from '~/components/ui/input'
import { Checkbox } from '~/components/ui/checkbox'
import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { ScrollArea } from '~/components/ui/scroll-area'

const QueryItem = z.object({
  key: z.string().default(''),
  type: z.enum(['query', 'param']).default('query'),
  value: z.string().default('')
})

const formSchema = z.object({
  title: z.string().min(1),
  flags: z.string(),
  searchSuggestion: z.boolean(),
  searchParams: QueryItem.required(),
  query: z.array(QueryItem),
  subPages: z.array(z.object({
    id: z.nullable(z.string()),
    query: z.array(QueryItem),
    title: z.string()
  })),
  detail: z.object({
    url: z.string(),
    rule: z.string(),
    headers: z.string()
  }).required(),
  preview: z.object({
    url: z.string(),
    rule: z.string(),
    headers: z.string()
  }).required(),
  list: z.object({
    url: z.string(),
    rule: z.string(),
    displayMode: z.enum(['card', 'collection', 'tag', 'text', 'waterfall']),
    headers: z.string()
  }).required(),
  tag: z.object({
    url: z.string(),
    rule: z.string(),
    displayMode: z.enum(['card', 'collection', 'tag', 'text', 'waterfall']),
    headers: z.string()
  }).required(),
  search: z.object({
    url: z.string(),
    rule: z.string(),
    displayMode: z.enum(['card', 'collection', 'tag', 'text', 'waterfall']),
    headers: z.string()
  }).required(),
})

const PageEditDrawer = memo(() => {
  const navigate = useNavigate()
  const currentSite = useCurrentSite()
  const page = useCurrentPage()
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      flags: '',
      searchSuggestion: false,
      searchParams: {
        key: '',
        type: 'query',
        value: ''
      },
      query: [],
      subPages: [],
      detail: {
        url: '',
        rule: '',
        headers: ''
      },
      preview: {
        url: '',
        rule: '',
        headers: ''
      },
      list: {
        url: '',
        rule: '',
        displayMode: 'card',
        headers: ''
      },
      tag: {
        url: '',
        rule: '',
        displayMode: 'card',
        headers: '',
      },
      search: {
        url: '',
        rule: '',
        displayMode: 'card',
        headers: '',
      },
    },
  })

  useEffect(() => {
    form.reset({
      ...page
    })
  }, [currentSite?.id])

  const handleSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    if (!currentSite || !page?.id) {
      return
    }
    dispatch(updateSitePage({
      siteId: currentSite.id,
      // @ts-ignore
      page: {
        id: page.id,
        ...values,
      }
    }))
    // TODO: 提示保存成功
  }, [dispatch, currentSite])

  const handleClose = useCallback((flag: boolean) => {
    if (flag) return
    navigate('../', {
      relative: 'path'
    })
  }, [navigate])

  const { fields: queryFields } = useFieldArray({ name: 'query', control: form.control });
  // const { fields: subPagesFields } = useFieldArray({ name: 'subPages', control: form.control });

  return (
    <Sheet open onOpenChange={handleClose}>
      <SheetContent className="w-[600px] min-w-[600px]">
        <div className="flex flex-col h-full">
          <SheetHeader className="flex-shrink-0">
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <div className="flex-grow h-full">
            <ScrollArea className="h-full mt-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>页面名称</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          站点当前页面的名称
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="flags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>额外设置</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          针对一些站点的特殊处理标记，多个标记之间用英文逗号分隔
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="searchSuggestion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>搜索建议</FormLabel>
                        <FormControl>
                          <div className="">
                            <Checkbox className="" checked={field.value} onCheckedChange={field.onChange} />
                          </div>
                          {/* <label
                            htmlFor="searchSuggestion"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Accept terms and conditions
                          </label> */}
                        </FormControl>
                        <FormDescription>
                          开启后会实时发送搜索请求（包含防抖）
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="searchParams.key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>搜索参数（键）</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          q=%s 中的 q
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="searchParams.value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>搜索参数（值）</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          q=%s 中的 %s
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="searchParams.type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>搜索参数（参数类型）</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="query" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="query">Query</SelectItem>
                            <SelectItem value="param">Param</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          搜索参数在 url 中的位置，?q=%s 为 Query，/:%s 为 Param
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* query 列表 */}
                  {queryFields.map((field, index) => (
                    <div className="" key={field.id}>
                      <FormField
                        control={form.control}
                        name={`query.${index}.key`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>参数（键）</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`query.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>参数（值）</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`query.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>参数类型</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="query" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="query">Query</SelectItem>
                                <SelectItem value="param">Param</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  {/* detail 设置 */}
                  <div className="flex flex-col gap-4">
                    <p className="text-lg">详情页</p>
                    <FormField
                      control={form.control}
                      name="detail.url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>详情页地址</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="detail.rule"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>详情页规则</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NONE">无</SelectItem>
                                {currentSite.detailRules.map((rule) => (
                                  <SelectItem key={rule.id} value={rule.id}>{rule.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="detail.headers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>详情页请求头</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* preview 设置 */}
                  <div className="flex flex-col gap-4">
                    <p className="text-lg">浏览页</p>
                    <FormField
                      control={form.control}
                      name="preview.url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>浏览页地址</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preview.rule"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>浏览页规则</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NONE">无</SelectItem>
                                {currentSite.previewRules.map((rule) => (
                                  <SelectItem key={rule.id} value={rule.id}>{rule.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preview.headers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>浏览页请求头</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* list 设置 */}
                  <div className="flex flex-col gap-4">
                    <p className="text-lg">列表页</p>
                    <FormField
                      control={form.control}
                      name="list.url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>列表页地址</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="list.rule"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>列表页规则</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NONE">无</SelectItem>
                                {currentSite.listRules.map((rule) => (
                                  <SelectItem key={rule.id} value={rule.id}>{rule.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="list.displayMode"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>列表页显示方式</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="card">卡片</SelectItem>
                                <SelectItem value="collection">合集</SelectItem>
                                <SelectItem value="tag">标签</SelectItem>
                                <SelectItem value="text">文本</SelectItem>
                                <SelectItem value="waterfall">瀑布流</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="list.headers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>列表页请求头</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* tag 设置 */}
                  <div className="flex flex-col gap-4">
                    <p className="text-lg">标签页</p>
                    <FormField
                      control={form.control}
                      name="tag.url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>标签页地址</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tag.rule"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>标签页规则</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NONE">无</SelectItem>
                                {currentSite.tagRules.map((rule) => (
                                  <SelectItem key={rule.id} value={rule.id}>{rule.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tag.displayMode"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>标签页显示方式</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="card">卡片</SelectItem>
                                <SelectItem value="collection">合集</SelectItem>
                                <SelectItem value="tag">标签</SelectItem>
                                <SelectItem value="text">文本</SelectItem>
                                <SelectItem value="waterfall">瀑布流</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tag.headers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>标签页请求头</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* search 设置 */}
                  <div className="flex flex-col gap-4">
                    <p className="text-lg">搜索页</p>
                    <FormField
                      control={form.control}
                      name="search.url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>搜索页地址</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="search.rule"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>搜索页规则</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NONE">无</SelectItem>
                                {currentSite.searchRules.map((rule) => (
                                  <SelectItem key={rule.id} value={rule.id}>{rule.title}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="search.displayMode"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>搜索页显示方式</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="card">卡片</SelectItem>
                                <SelectItem value="collection">合集</SelectItem>
                                <SelectItem value="tag">标签</SelectItem>
                                <SelectItem value="text">文本</SelectItem>
                                <SelectItem value="waterfall">瀑布流</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="search.headers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>搜索页请求头</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit">保存</Button>
                </form>
              </Form>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
})

export default PageEditDrawer
