import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCurrentRule, useCurrentSite } from '../../hooks';
import { useDispatch } from 'react-redux';
import { createDetailRule, createListRule, createPreviewRule, createSearchRule, updateSiteRule } from '~store/site/site-slice';
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { map } from 'lodash-es'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { ScrollArea } from '~/components/ui/scroll-area'
import type { RuleProps, SelectAction } from '~store/site/type';


const SelectActionSchema = z.object({
  selector: z.string(),
  function: z.string(),
  param: z.string(),
  regex: z.string(),
  replace: z.string()
})

const listRuleSchema = z.object({
  name: z.string(),
  item: SelectActionSchema,
  idCode: SelectActionSchema,
  title: SelectActionSchema,
  cover: SelectActionSchema,
  coverWidth: SelectActionSchema,
  coverHeight: SelectActionSchema,
  largeImage: SelectActionSchema,
  video: SelectActionSchema,
  category: SelectActionSchema,
  author: SelectActionSchema,
  uploader: SelectActionSchema,
  publishDate: SelectActionSchema,
  updateDate: SelectActionSchema,
  rating: SelectActionSchema,
  duration: SelectActionSchema,
  likes: SelectActionSchema,
  views: SelectActionSchema,
  totalPictures: SelectActionSchema,
  secondPageUrl: SelectActionSchema,
  pagerRule: z.object({
    nextPage: SelectActionSchema
  }),
  headerRule: z.object({
    httpHeaders: z.string(),
    pictureHeaders: z.string(),
  })
})

const detailRuleSchema = z.object({
  name: z.string(),
  title: SelectActionSchema,
  description: SelectActionSchema,
  cover: SelectActionSchema,
  coverWidth: SelectActionSchema,
  coverHeight: SelectActionSchema,
  largeImage: SelectActionSchema,
  video: SelectActionSchema,
  category: SelectActionSchema,
  author: SelectActionSchema,
  uploader: SelectActionSchema,
  publishDate: SelectActionSchema,
  updateDate: SelectActionSchema,
  rating: SelectActionSchema,
  duration: SelectActionSchema,
  likes: SelectActionSchema,
  views: SelectActionSchema,
  totalPictures: SelectActionSchema,
  secondPageUrl: SelectActionSchema,
  tagRule: z.object({
    item: SelectActionSchema,
    name: SelectActionSchema,
    url: SelectActionSchema,
  }),
  pictureRule: z.object({
    item: SelectActionSchema,
    thumbnail: SelectActionSchema,
    url: SelectActionSchema,
    link: SelectActionSchema,
  }),
  videoRule: z.object({
    item: SelectActionSchema,
    thumbnail: SelectActionSchema,
    url: SelectActionSchema,
    link: SelectActionSchema,
  }),
  chapterRule: z.object({
    item: SelectActionSchema,
    idCode: SelectActionSchema,
    title: SelectActionSchema,
    date: SelectActionSchema,
    url: SelectActionSchema
  }),
  commentRule: z.object({
    item: SelectActionSchema,
    avatar: SelectActionSchema,
    username: SelectActionSchema,
    date: SelectActionSchema,
    content: SelectActionSchema,
  }),
  pagerRule: z.object({
    nextPage: SelectActionSchema
  }),
  headerRule: z.object({
    httpHeaders: z.string(),
    pictureHeaders: z.string(),
  })
})

const previewRuleSchema = z.object({
  name: z.string(),
  secondPageUrl: SelectActionSchema,
  pictureRule: z.object({
    item: SelectActionSchema,
    picture: SelectActionSchema,
    totalPictures: SelectActionSchema,
    totalPages: SelectActionSchema,
    secondPageUrl: SelectActionSchema,
  }),
  videoRule: z.object({
    item: SelectActionSchema,
    title: SelectActionSchema,
    cover: SelectActionSchema,
    url: SelectActionSchema,
  }),
  headerRule: z.object({
    httpHeaders: z.string(),
    pictureHeaders: z.string(),
  })
})

const searchRuleSchema = z.object({
  name: z.string(),
  item: SelectActionSchema,
  idCode: SelectActionSchema,
  title: SelectActionSchema,
  cover: SelectActionSchema,
  coverWidth: SelectActionSchema,
  coverHeight: SelectActionSchema,
  largeImage: SelectActionSchema,
  video: SelectActionSchema,
  category: SelectActionSchema,
  author: SelectActionSchema,
  uploader: SelectActionSchema,
  publishDate: SelectActionSchema,
  updateDate: SelectActionSchema,
  rating: SelectActionSchema,
  duration: SelectActionSchema,
  likes: SelectActionSchema,
  views: SelectActionSchema,
  totalPictures: SelectActionSchema,
  secondPageUrl: SelectActionSchema,
  pagerRule: z.object({
    nextPage: SelectActionSchema
  }),
  headerRule: z.object({
    httpHeaders: z.string(),
    pictureHeaders: z.string(),
  })
})

type RuleSchema = typeof listRuleSchema | typeof detailRuleSchema | typeof previewRuleSchema | typeof searchRuleSchema

const schemaMapper: Record<RuleProps, RuleSchema> = {
  listRules: listRuleSchema,
  detailRules: detailRuleSchema,
  previewRules: previewRuleSchema,
  searchRules: searchRuleSchema,
  tagRules: searchRuleSchema,
}

const getRuleInstance = (ruleName: RuleProps) => {
  switch (ruleName) {
    case 'detailRules':
      return createDetailRule()
    case 'listRules':
      return createListRule()
    case 'previewRules':
      return createPreviewRule()
    case 'searchRules':
      return createSearchRule()
    case 'tagRules':
      return createSearchRule()
    default:
      throw new Error('Invalid rule name')
  }
}

const selectActionKeys: Array<keyof SelectAction> = ['selector', 'function', 'param', 'regex', 'replace']

interface Props {
  ruleName: RuleProps
}

const RuleEditDrawer = memo((props: Props) => {
  const { ruleName } = props
  const navigate = useNavigate()
  const currentSite = useCurrentSite()
  const rule = useCurrentRule()
  const dispatch = useDispatch()

  const formSchema = useMemo(() => {
    return schemaMapper[ruleName]
  }, [ruleName])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...getRuleInstance(ruleName),
    },
  })

  useEffect(() => {
    form.reset({
      ...rule
    })
  }, [currentSite?.id])

  const handleSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    if (!currentSite || !rule?.id) {
      return
    }
    dispatch(updateSiteRule({
      siteId: currentSite.id,
      ruleName,
      // @ts-ignore
      rule: {
        id: rule.id,
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
                  {map(form.getValues(), (value, key) => {
                    if (key === 'id') {
                      return null
                    } else if (key === 'name') {
                      return (
                        <FormField
                          key={key}
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>规则名称</FormLabel>
                              <FormControl>
                                <Input placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )
                    } else if (key === 'headerRule') {
                      return (
                        <div className="flex flex-col gap-4" key={key}>
                          <p className="text-lg">HTTP Header</p>
                          <FormField
                            control={form.control}
                            name="headerRule.httpHeaders"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>请求头</FormLabel>
                                <FormControl>
                                  <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="headerRule.pictureHeaders"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>图片请求头</FormLabel>
                                <FormControl>
                                  <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )
                    } else if (Object.prototype.toString.call(value) === '[object Object]') {
                      // 区分一层对象和两层对象
                      if ('selector' in value) {
                        // 一层对象，值直接就是 SelectAction，如 item
                        return (
                          <div className="flex flex-col gap-4 text-blue-500" key={key}>
                            <p className="text-lg">{key}</p>
                            {selectActionKeys.map(prop => (
                              <FormField
                                key={prop}
                                control={form.control}
                                // @ts-ignore
                                name={`${key}.${prop}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-950">{prop}</FormLabel>
                                    <FormControl>
                                      {/* @ts-ignore */}
                                      <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        )
                      } else {
                        // 两层对象，如 pager，下面还有 nextPage，nextPage 的值才是 SelectAction
                        return (
                          <div className="flex flex-col gap-4 text-blue-500" key={key}>
                            <p className="text-lg">{key}</p>
                            {map(value, (_, subKey) => (
                              <div className="text-green-500" key={subKey}>
                                <p className="text-lg">{subKey}</p>
                                {selectActionKeys.map(prop => (
                                  <FormField
                                    key={prop}
                                    control={form.control}
                                    // @ts-ignore
                                    name={`${key}.${subKey}.${prop}`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-950">{prop}</FormLabel>
                                        <FormControl>
                                          {/* @ts-ignore */}
                                          <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        )
                      }
                    }
                  })}
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

export default RuleEditDrawer
